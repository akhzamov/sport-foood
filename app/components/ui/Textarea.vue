<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    modelValue: any;
    placeholder: string;
  }>(),
  {}
);
const emit = defineEmits(["update:modelValue"]);
const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.value);
};
</script>

<template>
  <textarea
    :value="props.modelValue"
    @input="onInput"
    :placeholder="placeholder"
    class="px-3 py-3 bg-gray-15-color text-16-ext text-gray-40-color outline-none border-1 placeholder:text-gray-40-color rounded-lg resize-none"
  />
</template>

<style scoped>
textarea:-webkit-autofill,
textarea:-webkit-autofill:hover,
textarea:-webkit-autofill:focus,
textarea:-webkit-autofill:active {
  -webkit-box-shadow: 0 0 0px 1000px #00000000 inset !important;
  -webkit-text-fill-color: #ffffff66 !important;
  transition: background-color 5000s ease-in-out 0s;
}

/* Стили для Firefox */
textarea:-moz-autofill {
  box-shadow: 0 0 0px 1000px #00000000 inset !important;
  -moz-text-fill-color: #ffffff66 !important;
}

/* Общие стили */
textarea:-internal-autofill-selected {
  background-color: #00000000 !important;
  color: #ffffff66 !important;
}
</style>
