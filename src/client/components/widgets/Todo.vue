<script setup lang="ts">
import { ExclamationCircleIcon, CheckIcon } from '@heroicons/vue/24/outline';
import axios from 'axios';
import { ref, toRefs } from 'vue';
import type { TodoItem } from '../../../common/dto/todo-item';
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle
} from '@headlessui/vue';

export interface TodoWidgetResponseData {
  items: TodoItem[];
}

const isOpen = ref(false);
let currentItemId: any = undefined;
const checkedValue = ref(true);

async function markCompleted() {
  await doMarkCompleted(currentItemId);
  closeModal();
}

function closeModal() {
  isOpen.value = false;
  currentItemId = undefined;
  checkedValue.value = false;
}
function openModal(id: any) {
  currentItemId = id;
  isOpen.value = true;
}

const props = defineProps<TodoWidgetResponseData>();
const emit = defineEmits(['reload']);

const { items } = toRefs(props);

async function doMarkCompleted(id: any) {
  const item = items.value.find((item) => item.id === currentItemId);
  if (item) {
    console.log(`Completed '${item.name}'`);
    try {
      await axios.post(`/api/todo/tasks/${id}/completed`);
      emit('reload');
    } catch (e) {
      console.warn(`Error completing task: ${id} ${item.name}`);
    }
  }
}
</script>

<template>
  <div
    class="overflow-auto h-full bg-gradient-to-br from-slate-50 via-slate-100 to-slate-500 p-4"
  >
    <div class="flex flex-col h-full">
      <div class="text-slate-700 text-lg font-semibold">To Do List</div>
      <div v-if="items.length > 0">
        <div
          :key="item.id"
          v-for="[index, item] of items.entries()"
          class="p-2 border-b border-slate-600"
          :class="[index % 2 === 0 ? 'odd' : 'even']"
        >
          <label class="label cursor-pointer">
            <span class="flex flex-row items-center">
              <span v-if="item.priority === 4" class="pr-4"
                ><ExclamationCircleIcon class="w-6 h-6 text-red-500"
              /></span>

              <span class="label-text">{{ item.name }}</span>
            </span>

            <button
              type="button"
              class="inline-flex justify-center rounded-full border border-slate-400 bg-slate-300 px-2 py-2 text-sm font-medium"
              @click="openModal(item.id)"
            >
              <CheckIcon class="w-6 h-6 text-slate-800" />
            </button>
          </label>
        </div>
      </div>
      <div v-else class="h-full justify-center items-center flex flex-col">
        <div class="text-2xl font-extralight">You did it all!</div>
        <div class="text-8xl">🚀</div>
      </div>
    </div>
    <TransitionRoot appear :show="isOpen" as="template">
      <Dialog as="div" @close="closeModal" class="relative z-10">
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>

        <div class="fixed inset-0 overflow-y-auto">
          <div
            class="flex min-h-full items-center justify-center p-4 text-center"
          >
            <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
            >
              <DialogPanel
                class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
              >
                <DialogTitle
                  as="h3"
                  class="text-lg font-medium leading-6 text-gray-900"
                >
                  Mark task as completed
                </DialogTitle>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">Are you sure?</p>
                </div>

                <div class="mt-4 flex flex-row gap-4 justify-end">
                  <button
                    type="button"
                    class="inline-flex justify-center rounded-md border border-transparent bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-900 hover:bg-emerald-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
                    @click="markCompleted"
                  >
                    Yes
                  </button>

                  <button
                    type="button"
                    class="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                    @click="closeModal"
                  >
                    No
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>
