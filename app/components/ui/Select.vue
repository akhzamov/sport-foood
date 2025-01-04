<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    mainTextColor: string;
    selectBgColor: string;
    array: Record<string, any>[] | any[];
    showMenu: boolean;
    defaultSelectText: string;
    modelValue: any;
    icon: boolean;
    valueKey: string;
    labelKey: string;
  }>(),
  {
    mainTextColor: "text-gray-90-color",
    selectBgColor: "bg-gray-90-color",
    array: () => [],
    defaultSelectText: "",
    icon: false,
  }
);

const emit = defineEmits([
  "update:modelValue",
  "update:showMenu",
  "click:selectItem",
]);

const selectedItemId = ref(props.modelValue);
const selectedItemName = ref(props.defaultSelectText);

const selectItem = (id: number | string, name: string) => {
  emit("update:modelValue", id);
  emit("click:selectItem", id);
  emit("update:showMenu", false);
  selectedItemId.value = id;
  selectedItemName.value = name;
};

const setDefaultItem = () => {
  if (Array.isArray(props.array) && props.array.length > 0) {
    const firstItem = props.array[0];
    if (firstItem) {
      selectedItemId.value = firstItem[props.valueKey];
      selectedItemName.value = firstItem[props.labelKey];
      emit("update:modelValue", firstItem[props.valueKey]);
    }
  }
};

// Проверяем и устанавливаем текст по умолчанию
const checkDefaultText = () => {
  if (props.defaultSelectText) {
    selectedItemName.value = props.defaultSelectText;
  } else {
    setDefaultItem();
  }
};

watch(
  () => props.modelValue,
  () => {
    if (
      !props.modelValue &&
      selectedItemName.value !== props.defaultSelectText
    ) {
      selectedItemName.value = props.defaultSelectText;
    }
  }
);

watchEffect(() => {
  if (props.array && props.array.length > 0) {
    checkDefaultText();
  }
});
</script>

<template>
  <div class="relative">
    <div
      class="w-full h-full rounded-lg flex items-center justify-between px-4 select-none cursor-pointer"
      :class="props.selectBgColor"
      @click="emit('update:showMenu', !props.showMenu)"
    >
      <slot name="icon" />
      <span class="text-14-reg" :class="props.mainTextColor">
        {{ selectedItemName }}
      </span>
      <IconChevronUp :class="props.mainTextColor" v-if="!props.showMenu" />
      <IconChevronDown :class="props.mainTextColor" v-else />
      <div
        class="absolute bg-dark-eerie-black-color top-[105%] left-0 w-full rounded-lg px-3 py-3 flex flex-col gap-[10px]"
        v-if="props.showMenu"
      >
        <div
          class="flex items-center gap-2 cursor-pointer select-item"
          v-for="item in props.array"
          :key="item[props.valueKey]"
          @click.stop="selectItem(item[props.valueKey], item[props.labelKey])"
        >
          <slot name="value-icon" />
          <IconBranch class="text-gray-90-color" v-if="props.icon" />
          <span
            class="flex-grow text-16-med"
            :class="
              item[props.labelKey] == selectedItemName
                ? 'text-primary-color'
                : 'text-gray-90-color'
            "
          >
            {{ item[props.labelKey] }}
          </span>
          <IconCheck
            v-if="item[props.labelKey] == selectedItemName"
            class="text-primary-color"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.select-item:hover svg {
  @apply text-primary-color;
}

.select-item:hover span {
  @apply text-primary-color;
}
</style>
