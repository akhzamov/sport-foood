<script lang="ts" setup>
import { useMainStore } from "~/stores/main";

const mainStore = useMainStore();
const props = withDefaults(
  defineProps<{
    type: string;
    title: string;
    text: string;
  }>(),
  {
    type: "success",
    title: "Успешно",
    text: "Вы успешно авторизовались!",
  }
);

const onCancel = () => {
  mainStore.closeConfirm(false);
};

const onConfirm = () => {
  mainStore.closeConfirm(true);
};
</script>

<template>
  <div
    class="alert-modal fixed z-[300] top-0 left-0 w-full h-screen flex justify-center items-center bg-gray-40 select-none"
    @click="onCancel()"
  >
    <div
      @click.stop
      class="relative w-[400px] h-max bg-dark-gunmental rounded-xl border-[1px] border-gray-15 p-6 flex flex-col items-center justify-center"
    >
      <div
        class="w-12 h-12 rounded-[50%] bg-warning-500/20 flex items-center justify-center mb-4"
        v-if="type == 'warning'"
      >
        <IconInfo class="text-warning-500 w-[25px] h-[25px]" />
      </div>
      <div
        class="w-12 h-12 rounded-[50%] bg-success-500/20 flex items-center justify-center mb-4"
        v-if="type == 'success'"
      >
        <IconCheckCircleBroken class="text-success-500 w-[25px] h-[25px]" />
      </div>
      <div
        class="w-12 h-12 rounded-[50%] bg-error-500/20 flex items-center justify-center mb-4"
        v-if="type == 'error'"
      >
        <IconClose class="text-error-500 w-[25px] h-[25px]" />
      </div>
      <h4 class="text-24-bold text-white mb-2">{{ props.title }}</h4>
      <p class="text-16-med text-gray-75 text-center">{{ props.text }}</p>
      <div class="flex items-center justify-center gap-4 mt-4">
        <UiButton
          bgColor="bg-primary"
          :border="false"
          :icon="false"
          hover="opacity-[0.9]"
          textColor="text-dark-night"
          text="Нет"
          class="w-[110px]"
          type="submit"
          @click="onCancel()"
        />
        <UiButton
          bgColor="bg-transparent"
          :border="true"
          border-color="border-error-500"
          :icon="true"
          hover="opacity-[0.9]"
          textColor="text-error-500"
          text="Да"
          class="w-[110px]"
          type="submit"
          @click="onConfirm()"
        />
      </div>
    </div>
  </div>
</template>

<style></style>
