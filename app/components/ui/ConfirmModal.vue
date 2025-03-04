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
    type: "save",
  }
);

const closeConfirmModal = () => {
  mainStore.confirmModal = false;
  mainStore.confirmModalText = "";
  mainStore.confirmModalTitle = "";
};
</script>

<template>
  <div
    class="alert-modal fixed z-[300] top-0 left-0 w-full h-screen flex justify-center items-center bg-gray-40 select-none"
    @click="closeConfirmModal()"
  >
    <div
      @click.stop
      class="relative w-[400px] h-max bg-dark-gunmental rounded-xl border-[1px] border-gray-15 p-6 flex flex-col items-center justify-center"
    >
      <IconClose
        class="text-gray-75 absolute top-[10px] right-[10px] cursor-pointer"
        @click="closeConfirmModal()"
      />
      <div
        class="w-12 h-12 rounded-[50%] bg-warning-500/20 flex items-center justify-center mb-4"
        v-if="type == 'cancel'"
      >
        <IconClose class="text-warning-500 w-[25px] h-[25px]" />
      </div>
      <div
        class="w-12 h-12 rounded-[50%] bg-success-500/20 flex items-center justify-center mb-4"
        v-if="type == 'save'"
      >
        <IconPlus class="text-success-500 w-[25px] h-[25px]" />
      </div>
      <div
        class="w-12 h-12 rounded-[50%] bg-error-500/20 flex items-center justify-center mb-4"
        v-if="type == 'delete'"
      >
        <IconTrash03 class="text-error-500 w-[25px] h-[25px]" />
      </div>
      <h4 class="text-24-bold text-white mb-1 text-center">
        {{ props.title }}
      </h4>
      <p class="text-14-med text-gray-75 text-center mt-3">
        {{ props.text }}
      </p>
      <div class="w-full flex items-center justify-end gap-2 mt-3">
        <UiButton
          text="Удалить"
          bg-color="bg-error-500"
          text-color="text-gray-90"
          hover="bg-error-700"
          :border="false"
          :icon="false"
          class="w-[95px]"
          @click="closeConfirmModal()"
        />
        <UiButton
          text="Отмена"
          bg-color="bg-gray-15"
          text-color="text-gray-90"
          border-color="border-gray-90"
          hover="bg-gray-25"
          :border="true"
          :icon="false"
          class="w-[95px]"
          @click="closeConfirmModal()"
        />
      </div>
    </div>
  </div>
</template>

<style></style>
