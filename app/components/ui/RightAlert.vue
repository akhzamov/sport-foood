<script lang="ts" setup>
import { useMainStore } from "~/stores/main";

const mainStore = useMainStore();
const props = withDefaults(
  defineProps<{
    type: string;
    text: string;
  }>(),
  {
    type: "success",
    text: "Вы успешно авторизовались!",
  }
);
</script>

<template>
  <div
    class="absolute z-[300] top-0 right-0 translate-y-[66px] translate-x-[-5px] w-max h-max select-none"
  >
    <div
      @click.stop
      class="relative min-w-[400px] h-[45px] rounded-xl flex items-center justify-center gap-3"
      :class="[
        { 'bg-success-800/90 border border-success-500': type == 'success' },
        { 'bg-error-800/90 border border-error-500': type == 'error' },
        { 'bg-warning-800/90 border border-warning-500': type == 'warning' },
      ]"
    >
      <div
        class="w-6 h-6 rounded-[50%] flex items-center justify-center"
        v-if="type == 'warning'"
      >
        <IconInfo class="text-warning-500 w-[25px] h-[25px]" />
      </div>
      <div
        class="w-6 h-6 rounded-[50%] flex items-center justify-center"
        v-if="type == 'success'"
      >
        <IconCheckCircleBroken class="text-success-500 w-[25px] h-[25px]" />
      </div>
      <div
        class="w-6 h-6 rounded-[50%] flex items-center justify-center"
        v-if="type == 'error'"
      >
        <IconClose class="text-error-500 w-[25px] h-[25px]" />
      </div>
      <p class="text-14-med text-gray-75 text-center">{{ props.text }}</p>
    </div>
  </div>
</template>

<style></style>
