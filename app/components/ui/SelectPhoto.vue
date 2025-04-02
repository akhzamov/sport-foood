<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    modelValue: Record<number, File> | null;
    images?: string[];
    length: number;
  }>(),
  {
    modelValue: null,
  }
);

const emit = defineEmits(["update:modelValue"]);

const handlePhotoSelect = (index: number) => {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";
  input.onchange = (e: Event) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (file) {
      emit("update:modelValue", {
        ...props.modelValue,
        [index]: file, // Сохраняем File напрямую
      });
    }
  };
  input.click();
};

const previewUrls = computed<Record<number, string>>(() => {
  const urls: Record<number, string> = {};

  if (props.images) {
    props.images.forEach((img, index) => {
      urls[index] = img;
    });
  }

  if (props.modelValue) {
    Object.entries(props.modelValue).forEach(([index, file]) => {
      urls[Number(index)] = URL.createObjectURL(file);
    });
  }

  return urls;
});
</script>

<template>
  <div class="flex items-center justify-between">
    <div
      v-for="index in length"
      :key="index"
      class="flex items-center justify-center cursor-pointer border border-dashed border-gray-15 rounded-lg"
      :class="length > 1 ? 'w-[80px] h-[70px]' : 'w-full h-full'"
      @click="handlePhotoSelect(index - 1)"
    >
      <img
        v-if="previewUrls[index - 1]"
        :src="previewUrls[index - 1]"
        alt="Selected photo"
        class="w-full h-full object-contain rounded-lg"
      />
      <div v-else class="w-[40px] h-[40px] flex items-center justify-center rounded-lg bg-gray-15">
        <IconCamera01 class="text-gray-90" />
      </div>
    </div>
  </div>
</template>
