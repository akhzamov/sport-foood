<script lang="ts" setup>
const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
})
const emit = defineEmits(['update:modelValue']);
const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
};
</script>

<template>
  <input :value="props.modelValue" @input="onInput" class="w-full h-[40px] bg-transparent text-16-ext text-gray-40-color outline-none
placeholder:text-gray-40-color">
</template>

<style scoped>
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  -webkit-box-shadow: 0 0 0px 1000px #00000000 inset !important;
  -webkit-text-fill-color: #ffffff66 !important;
  transition: background-color 5000s ease-in-out 0s;
}

/* Стили для Firefox */
input:-moz-autofill {
  box-shadow: 0 0 0px 1000px #00000000 inset !important;
  -moz-text-fill-color: #ffffff66 !important;
}

/* Общие стили */
input:-internal-autofill-selected {
  background-color: #00000000 !important;
  color: #ffffff66 !important;
}
</style>