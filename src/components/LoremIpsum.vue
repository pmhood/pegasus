<script setup lang="ts">
import { FooService } from '@/services/foo.service';
const foo = new FooService();
</script>

<template>
  <div class="backdrop-blur-lg">
    <h1 class="text-slate-600 text-lg">
      Ad amet fugiat dolore qui veniam non qui minim adipisicing.
    </h1>
    <p>
      {{ foo.bar() }}
    </p>
    <p>
      Cillum incididunt cupidatat sunt eiusmod cillum duis dolor in. Consectetur
      ipsum occaecat ex voluptate nulla officia laboris adipisicing consequat.
      Laborum aute est et est do id commodo proident laboris cillum. Aliquip
      tempor reprehenderit non aliqua duis laboris laboris magna nostrud ea
      ullamco enim. Ut ad et ex id in mollit anim. Elit anim enim adipisicing
      reprehenderit Lorem aliqua occaecat aliqua quis pariatur consectetur
      aliqua sunt.
    </p>
  </div>
</template>
