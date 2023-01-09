<script setup lang="ts">
import { ExclamationCircleIcon } from '@heroicons/vue/24/outline';
import axios from 'axios';
import { ref } from 'vue';
import type { TodoItem } from '../../../common/dto/todo-item';

export interface TodoWidgetResponseData {
  items: TodoItem[];
}

const props = defineProps<TodoWidgetResponseData>();
const items = ref<TodoItem[]>(props.items);

async function onChange(id: string) {
  const item = props.items.find((item) => item.id === id);
  if (item) {
    console.log(`Completed '${item.name}''`);
    try {
      await axios.post(`/api/todo/tasks/${id}/completed`);
      items.value = items.value.filter((item) => item.id !== id);
    } catch (e) {
      console.warn(`Error completing task: ${id} ${item.name}`);
    }
  }
}
</script>

<template>
  <div class="bg-slate-50 overflow-auto p-4 flex flex-col">
    <div class="text-slate-700 text-lg font-semibold">To Do List</div>
    <div
      :key="item.id"
      v-for="[index, item] of items.entries()"
      class="p-4 border-b"
      :class="[index % 2 === 0 ? 'odd' : 'even']"
    >
      <label class="label cursor-pointer">
        <span class="flex flex-row items-center">
          <span v-if="item.priority === 4" class="pr-4"
            ><ExclamationCircleIcon class="w-6 h-6 text-red-500"
          /></span>

          <span class="label-text">{{ item.name }}</span>
        </span>

        <input type="checkbox" class="checkbox" @change="onChange(item.id)" />
      </label>
    </div>
  </div>
</template>
