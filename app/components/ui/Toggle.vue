<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    modelValue: boolean;
  }>(),
  {}
);
const emit = defineEmits(["update:modelValue"]);
const onChange = (value: boolean) => {
  emit("update:modelValue", value);
};
</script>

<template>
  <div
    :class="[
      props.modelValue
        ? 'bg-primary-color justify-end'
        : 'bg-gray-75-color justify-start',
    ]"
    @click="onChange(!props.modelValue)"
    class="w-[36px] h-[20px] rounded-xl flex items-center p-[2px] cursor-pointer transition-all duration-200"
  >
    <div class="w-[16px] h-[16px] rounded-[50%] block bg-white"></div>
  </div>
</template>

<style scoped></style>
