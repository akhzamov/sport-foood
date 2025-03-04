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
    mainTextColor: "text-gray-90",
    selectBgColor: "bg-gray-15",
    disableTextColor: "text-gray-40",
    disableBgColor: "bg-gray-15",
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

const selectedItemId = ref<null | number>(props.modelValue);
const selectedItemName = ref(props.defaultSelectText);
const selectRef = useTemplateRef<HTMLElement>("selectRef");
onClickOutside(selectRef, () => emit("update:showMenu", false));

const isArray = (data: unknown): data is any[] => Array.isArray(data);

const getArrayFromProps = () => {
  return isArray(props.array) ? props.array : Object.values(props.array);
};

const selectItem = (id: number | null, name: string) => {
  emit("update:modelValue", id);
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
  <div class="relative" ref="selectRef">
    <div
      class="h-full rounded-[36px] flex items-center justify-between px-4 select-none border"
      :class="[
        props.selectBgColor,
        props.width,
        props.showMenu ? ' border-gray-40' : 'border-transparent',
        props.disable ? 'cursor-not-allowed' : 'cursor-pointer',
      ]"
      @click="emit('update:showMenu', props.disable ? false : !props.showMenu)"
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
        class="absolute bg-dark-eerie-black top-[105%] left-0 w-full max-h-[300px] rounded-lg px-3 py-3 flex flex-col gap-[10px] overflow-y-auto border border-gray-40"
        v-if="props.showMenu && !props.disable"
      >
        <div
          class="flex items-center gap-2 cursor-pointer select-item"
          @click.stop="selectItem(null, 'Все')"
        >
          <slot name="value-icon" />
          <IconBranch class="text-gray-90" v-if="props.icon" />
          <span
            class="flex-grow text-14-reg"
            :class="
              selectedItemName == props.defaultSelectText ||
              selectedItemName == 'Все'
                ? 'text-primary'
                : 'text-gray-90'
            "
          >
            {{ props.defaultSelectText ?? "Все" }}
          </span>
          <IconCheck
            v-if="
              selectedItemName == props.defaultSelectText ||
              selectedItemName == 'Все'
            "
            class="text-primary"
          />
        </div>
        <div
          class="flex items-center gap-2 cursor-pointer select-item"
          v-for="item in getArrayFromProps()"
          :key="item[props.valueKey]"
          @click.stop="selectItem(item[props.valueKey], item[props.labelKey])"
        >
          <slot name="value-icon" />
          <IconBranch class="text-gray-90" v-if="props.icon" />
          <span
            class="flex-grow text-14-reg"
            :class="
              item[props.labelKey] == selectedItemName
                ? 'text-primary'
                : 'text-gray-90'
            "
          >
            {{ item[props.labelKey] }}
          </span>
          <IconCheck
            v-if="item[props.labelKey] == selectedItemName"
            class="text-primary"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.select-item:hover svg {
  @apply text-primary;
}

.select-item:hover span {
  @apply text-primary;
}
</style>
