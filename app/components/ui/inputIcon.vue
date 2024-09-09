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

<style scoped></style>