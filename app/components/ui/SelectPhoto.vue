<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    modelValue: Record<number, string> | null;
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
      const reader = new FileReader(); // Создаем FileReader для чтения файла
      reader.onload = () => {
        // После загрузки файла обновляем modelValue
        const base64String = reader.result as string; // Получаем строку Base64
        emit("update:modelValue", {
          ...props.modelValue,
          [index]: base64String, // Сохраняем результат в modelValue по индексу
        });
      };
      reader.readAsDataURL(file);
    }
  };
  input.click();
};
</script>

<template>
  <div class="flex items-center justify-between">
    <div
      v-for="index in length"
      :key="index"
      class="w-[80px] h-[70px] flex items-center justify-center cursor-pointer border border-dashed border-gray-15-color rounded-lg"
      @click="handlePhotoSelect(index - 1)"
    >
      <img
        v-if="props.modelValue && props.modelValue[index - 1]"
        :src="props.modelValue[index - 1]"
        alt="Selected photo"
        class="w-full h-full object-cover rounded-lg"
      />
      <div
        v-else
        class="w-[40px] h-[40px] flex items-center justify-center rounded-lg bg-gray-15-color"
      >
        <IconCamera01 class="text-gray-90-color" />
      </div>
    </div>
  </div>
</template>
