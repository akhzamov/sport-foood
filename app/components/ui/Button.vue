<script lang="ts" setup>
const props = defineProps({
  text: {
    type: String,
    default: "Click",
  },
  bgColor: {
    type: String,
    default: "bg-primary",
  },
  textColor: {
    type: String,
    default: "text-dark-night",
  },
  borderColor: {
    type: String,
    default: "border-gray-15",
  },
  hover: {
    type: String,
    required: true,
  },
  border: {
    type: Boolean,
    required: true,
  },
});
</script>

<template>
  <button
    class="border px-2 py-2 rounded-lg transition duration-200 flex items-center justify-center gap-2 cursor-pointer"
    :class="[
      bgColor,
      props.border ? props.borderColor : 'border-transparent',
      props.hover.length > 0 ? `hover:${props.hover}` : '',
    ]"
  >
    <slot name="icon" />
    <span :class="[textColor]">{{ text }}</span>
    <slot name="icon-r" />
  </button>
</template>

<style scoped></style>
