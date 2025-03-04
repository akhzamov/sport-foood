<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    modelValue: Record<number, { base64: string; name: string }> | null;
    length: number;
  }>(),
  {
    modelValue: null,
  }
);

const emit = defineEmits(["update:modelValue"]);

const handleFileSelect = (index: number) => {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "*/*";
  input.onchange = (e: Event) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader(); // Создаем FileReader для чтения файла
      reader.onload = () => {
        // После загрузки файла обновляем modelValue
        const base64String = reader.result as string; // Получаем строку Base64
        emit("update:modelValue", {
          ...props.modelValue,
          [index]: { base64: base64String, name: file.name }, // Сохраняем Base64 строку и имя файла
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
      class="w-[80px] h-[70px] flex items-center justify-center cursor-pointer border border-dashed border-gray-15 rounded-lg"
      @click="handleFileSelect(index - 1)"
    >
      <div
        v-if="props.modelValue && props.modelValue[index - 1]"
        class="w-full flex flex-col items-center px-[2px]"
      >
        <IconFileCheck03 class="text-gray-40 mb-1" />
        <span
          class="w-full text-8-reg text-gray-75  text-center whitespace-nowrap overflow-hidden text-ellipsis"
        >
          {{ props.modelValue?.[index - 1]?.name || "Файл не выбран" }}
        </span>
      </div>
      <div
        v-else
        class="w-[40px] h-[40px] flex items-center justify-center rounded-lg bg-gray-15"
      >
        <IconFilePlus03 class="text-gray-40" />
      </div>
    </div>
  </div>
</template>
