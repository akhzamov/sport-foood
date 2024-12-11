<script lang="ts" setup>
const props = defineProps({
  text: {
    type: String,
    default: "Click",
  },
  bgColor: {
    type: String,
    default: "bg-primary-color",
  },
  textColor: {
    type: String,
    default: "text-dark-night-color",
  },
  borderColor: {
    type: String,
    default: "border-gray-15-color",
  },
  hover: {
    type: String,
    required: true,
  },
  icon: {
    type: Boolean,
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
    class="w-full border px-4 py-2 rounded-lg transition duration-200 flex items-center justify-center gap-2 cursor-pointer"
    :class="[
      bgColor,
      props.border ? props.borderColor : 'border-transparent',
      props.hover,
    ]"
  >
    <slot name="icon" />
    <span :class="[textColor]">{{ text }}</span>
    <slot name="icon-r" />
  </button>
</template>

<style scoped></style>
