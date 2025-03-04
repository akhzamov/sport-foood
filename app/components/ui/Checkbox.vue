<script lang="ts" setup>
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);
const isChecked = ref(props.modelValue);

watch(
  () => props.modelValue,
  (newValue) => {
    isChecked.value = newValue;
  }
);
const toggleCheckbox = () => {
  isChecked.value = !isChecked.value;
  emit("update:modelValue", isChecked.value);
};
</script>

<template>
  <div class="relative w-5 h-5 z-10 cursor-pointer" @click="toggleCheckbox">
    <input
      type="checkbox"
      v-model="isChecked"
      class="w-5 h-5 absolute top-0 left-0 opacity-0 z-20 cursor-pointer"
    />
    <div class="inline-flex items-center z-10">
      <div
        class="w-5 h-5 rounded-md flex items-center justify-center transition-colors duration-200 border border-gray-75"
        :class="{
          'bg-primary ': isChecked,
          'bg-gray-15': !isChecked,
        }"
      >
        <IconCheck v-if="isChecked" class="text-white w-[15px] h-[15px]" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
