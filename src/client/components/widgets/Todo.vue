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
const { items } = toRefs(props);

async function doMarkCompleted(id: any) {
  const item = items.value.find((item) => item.id === currentItemId);
  if (item) {
    console.log(`Completed '${item.name}'`);
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
  <div class="overflow-auto">
    <div class="bg-slate-50 p-4 flex flex-col">
      <div class="text-slate-700 text-lg font-semibold">
        To Do List ({{ items.length }} items {{ props.items.length }})
      </div>
      <div
        :key="item.id"
        v-for="[index, item] of items.entries()"
        class="p-2 border-b"
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
            class="inline-flex justify-center rounded-md border border-transparent bg-slate-100 px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2"
            @click="openModal(item.id)"
          >
            <CheckIcon class="w-6 h-6 text-slate-700" />
          </button>
        </label>
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
