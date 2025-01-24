<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    mainTextColor: string;
    selectBgColor: string;
    disableTextColor: string;
    disableBgColor: string;
    array:
      | Record<string | number | symbol, any>[]
      | any[]
      | Record<string | number | symbol, any>;
    showMenu: boolean;
    defaultSelectText: string;
    modelValue: any;
    icon: boolean;
    valueKey: string;
    labelKey: string;
    width: string;
    textCenter: boolean;
    disable: boolean;
  }>(),
  {
    mainTextColor: "text-gray-90-color",
    selectBgColor: "bg-gray-15-color",
    disableTextColor: "text-gray-40-color",
    disableBgColor: "bg-gray-15-color",
    array: () => [],
    defaultSelectText: "",
    icon: false,
    texCenter: false,
  }
);

const emit = defineEmits([
  "update:modelValue",
  "update:showMenu",
  "click:selectItem",
]);

const selectedItemId = ref(props.modelValue);
const selectedItemName = ref(props.defaultSelectText);

const isArray = (data: unknown): data is any[] => Array.isArray(data);

const getArrayFromProps = () => {
  return isArray(props.array) ? props.array : Object.values(props.array);
};

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
  const array = getArrayFromProps();
  if (array.length > 0) {
    checkDefaultText();
  }
});
</script>

<template>
  <div class="relative">
    <div
      class="h-full rounded-lg flex items-center justify-between px-4 select-none"
      :class="[
        props.selectBgColor,
        props.width,
        props.disable ? 'cursor-not-allowed' : 'cursor-pointer',
      ]"
      @click="emit('update:showMenu', !props.showMenu)"
    >
      <slot name="icon" />
      <span
        class="w-full text-14-reg"
        :class="[
          props.disable ? props.disableTextColor : props.mainTextColor,
          props.textCenter ? 'text-center' : '',
        ]"
      >
        {{ selectedItemName }}
      </span>
      <IconChevronUp
        :class="[props.disable ? props.disableTextColor : props.mainTextColor]"
        v-if="!props.showMenu && !props.disable"
      />
      <IconChevronDown
        :class="[props.disable ? props.disableTextColor : props.mainTextColor]"
        v-else
      />
      <div
        class="absolute max-h-[350px] bg-dark-eerie-black-color top-[105%] left-0 w-full rounded-lg px-3 py-3 flex flex-col gap-[10px] overflow-y-auto"
        v-if="props.showMenu && !props.disable"
      >
        <div
          class="flex items-center gap-2 cursor-pointer select-item"
          v-for="item in getArrayFromProps()"
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
