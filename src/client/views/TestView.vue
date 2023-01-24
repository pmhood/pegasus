<template>
  <div class="w-screen h-screen grid grid-rows-[64px]">
    <header class="navbar bg-slate-100 border-b-1 border-slate-500 h-16">
      <div class="navbar-start divide-x-2 divde-black">
        <button class="px-4" @click="goBack()">
          <HomeIcon class="h-6 w-6 text-slate-800" />
        </button>

        <h3 class="font-semibold px-4"></h3>
      </div>
      <div class="navbar-center"></div>
      <div class="navbar-end divide-x-2">
        <h4 class="p-4">
          <img
            alt="Vue logo"
            class="logo"
            src="@/assets/habitica.jpg"
            width="32"
            height="32"
          />
        </h4>

        <h4 class="text-slate-600 p-4">
          <InformationCircleIcon class="h-8 text-slate-800" />
        </h4>
      </div>
    </header>

    <main class="bg-lime-200 h-full p-8">
      <!-- <div class="bg-orange-300 mx-auto max-w-7xl py-6 px-6 h-full"> -->
      <div
        class="bg-green-400 grid grid-cols-3 mx-auto h-full grid-rows-[60%_40%]"
      >
        <div class="bg-red-400 col-start-2 col-span-2">top</div>
        <div class="bg-amber-200 col-start-2 m-4 overflow-auto">
          left
          <div class="p-8">
            Consectetur fugiat quis qui elit Lorem do culpa dolore occaecat.
            Aute irure tempor aute reprehenderit tempor. Dolor eiusmod
            reprehenderit cupidatat tempor officia incididunt eu dolor nisi
            commodo do incididunt. Ipsum voluptate commodo irure ea.
          </div>
        </div>
        <div class="bg-sky-400 col-start-3 overflow-auto">
          right
          <div class="p-8">
            Consectetur fugiat quis qui elit Lorem do culpa dolore occaecat.
            Aute irure tempor aute reprehenderit tempor. Dolor eiusmod
            reprehenderit cupidatat tempor officia incididunt eu dolor nisi
            commodo do incididunt. Ipsum voluptate commodo irure ea.
          </div>
        </div>
      </div>
      <!-- </div> -->
    </main>
  </div>
</template>

<script setup>
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems
} from '@headlessui/vue';
import {
  Bars3Icon,
  BellIcon,
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  InformationCircleIcon
} from '@heroicons/vue/24/outline';

import { HomeIcon } from '@heroicons/vue/24/solid';

const windowHeight = window.innerHeight;
const windowWidth = window.innerWidth;

const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
};
const navigation = [
  { name: 'Dashboard', href: '#', current: true },
  { name: 'Team', href: '#', current: false },
  { name: 'Projects', href: '#', current: false },
  { name: 'Calendar', href: '#', current: false },
  { name: 'Reports', href: '#', current: false }
];
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' }
];
</script>
