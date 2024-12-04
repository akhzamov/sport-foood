<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    defaultSelectText: string;
    array: any;
    showMenu: boolean;
    modelValue: number | null;
  }>(),
  {}
);
const emit = defineEmits([
  "update:modelValue",
  "update:showMenu",
  "click:selectItem",
]);
const selectedItemId = ref(props.modelValue);
const selectedItemName = ref(props.defaultSelectText);
const activeMenu = (): void => {
  emit("update:showMenu", props.showMenu ? false : true);
};
const selectItem = (id: number): void => {
  if (props.array) {
    let selectedItem = props.array.find((item: any) => item.id == id);
    if (selectedItem) {
      selectedItemId.value = selectedItem.id;
      selectedItemName.value = selectedItem.name;
      emit("update:modelValue", id);
      activeMenu();
    }
  }
};

const setDefaultItem = () => {
  if (props.modelValue == 0) {
    selectedItemName.value = "Выбрать замену";
  }
};

const checkDefaultText = () => {
  if (props.defaultSelectText) {
    selectedItemName.value = props.defaultSelectText;
  } else {
    setDefaultItem();
  }
};

watchEffect(() => {
  if (props.array) {
    checkDefaultText();
  }
});
</script>

<template>
  <div
    class="relative min-w-[156px] w-max min-h-[32px] h-full select-none"
    @click.stop
  >
    <div
      @click="activeMenu"
      :class="[props.showMenu ? 'border-gray-40-color' : 'border-transparent']"
      class="w-full h-full flex items-center justify-between cursor-pointer pl-4 pr-2 bg-gray-15-color border rounded-[36px] text-gray-90-color"
    >
      <p class="text-12-reg">{{ selectedItemName }}</p>
      <IconChevronDown />
    </div>
    <div
      v-if="props.showMenu"
      class="absolute top-[100%] left-0 right-0 w-full h-max py-2 px-1 flex flex-col translate-y-[7px] bg-dark-eerie-black-color border border-gray-40-color rounded-lg"
    >
      <p
        v-for="item in props.array"
        :key="item.id"
        @click="selectItem(item.id)"
        class="text-16-reg text-gray-75-color cursor-pointer hover:bg-gray-25-color hover:text-primary-color px-3 py-1 rounded-md"
      >
        {{ item.name }}
      </p>
    </div>
  </div>
</template>

<style scoped></style>
