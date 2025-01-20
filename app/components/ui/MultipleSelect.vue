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
    valueKey: string;
    labelKey: string;
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
    texCenter: false,
  }
);

const emit = defineEmits([
  "update:modelValue",
  "update:showMenu",
  "click:selectItem",
]);

const state = reactive({
  selectedItemIds: [] as (number | string)[],
  selectedItems: [] as string[],
});

const defaultSelectText = ref(props.defaultSelectText);

const isArray = (data: unknown): data is any[] => Array.isArray(data);

const getArrayFromProps = () => {
  return isArray(props.array) ? props.array : Object.values(props.array);
};

// Обработка выбора элемента
const selectItem = (id: number | string, name: string) => {
  if (!state.selectedItemIds.includes(id)) {
    state.selectedItemIds.push(id);
  }
  if (!state.selectedItems.includes(name)) {
    state.selectedItems.push(name);
  }
  emit("update:modelValue", state.selectedItemIds);
  emit("click:selectItem", state.selectedItems);
  emit("update:showMenu", false);
};

// Удаление элемента из выбранных
const removeItem = (index: number) => {
  if (index >= 0 && index < state.selectedItemIds.length) {
    state.selectedItemIds.splice(index, 1);
  }
  if (index >= 0 && index < state.selectedItems.length) {
    state.selectedItems.splice(index, 1);
  }
};

// Проверка текста по умолчанию
const checkDefaultText = () => {
  if (state.selectedItems.length == 0 || state.selectedItemIds.length == 0) {
    defaultSelectText.value = props.defaultSelectText;
  }
};

watch(
  () => props.modelValue,
  () => {
    if (props.modelValue.length == 0) {
      state.selectedItemIds = [];
      state.selectedItems = [];
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
  <div class="h-[40px] relative">
    <div
      class="w-full h-full rounded-lg flex items-center justify-between px-4 select-none"
      :class="[
        props.selectBgColor,
        props.disable ? 'cursor-not-allowed' : 'cursor-pointer',
      ]"
      @click="emit('update:showMenu', !props.showMenu)"
    >
      <slot name="icon" />
      <div
        class="w-full flex items-center justify-start gap-1 overflow-hidden cursor-auto multiple-select-display"
        v-if="state.selectedItems.length > 0"
      >
        <div
          class="w-max h-[22px] flex items-center gap-1 pl-2 pr-1 rounded-[20px] bg-gray-15-color text-gray-90-color text-12-reg"
          :class="[
            props.disable ? props.disableTextColor : props.mainTextColor,
          ]"
          v-for="(item, index) in state.selectedItems"
          :key="index"
        >
          <p class="w-max">
            {{ item }}
          </p>
          <IconClose
            @click.stop="removeItem(index)"
            class="w-[18px] h-[18px] cursor-pointer"
          />
        </div>
      </div>
      <span
        class="w-full text-14-reg"
        :class="[
          props.disable ? props.disableTextColor : props.mainTextColor,
          props.textCenter ? 'text-center' : '',
        ]"
        v-if="state.selectedItems.length == 0"
      >
        {{ defaultSelectText }}
      </span>
      <IconChevronUp
        class="w-[24px] h-[24px]"
        :class="[props.disable ? props.disableTextColor : props.mainTextColor]"
        v-if="!props.showMenu && !props.disable"
      />
      <IconChevronDown
        class="w-[24px] h-[24px]"
        :class="[props.disable ? props.disableTextColor : props.mainTextColor]"
        v-else
      />
      <div
        class="absolute bg-dark-eerie-black-color top-[105%] left-0 w-full rounded-lg px-3 py-3 flex flex-col gap-[10px]"
        v-if="props.showMenu && !props.disable"
      >
        <!-- Отображение элементов -->
        <div
          class="flex items-center gap-2 cursor-pointer select-item"
          v-for="(item, index) in Array.isArray(props.array)
            ? props.array
            : Object.values(props.array)"
          :key="item[props.valueKey] || index"
          @click.stop="selectItem(item[props.valueKey], item[props.labelKey])"
        >
          <slot name="value-icon" />
          <div
            class="w-full flex items-center justify-between"
            :class="[
              state.selectedItems.includes(item[props.labelKey])
                ? 'text-primary-color'
                : 'text-gray-90-color',
            ]"
          >
            <span class="text-16-med">
              {{ item[props.labelKey] }}
            </span>
            <IconCheck
              v-if="state.selectedItems.includes(item[props.labelKey])"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="css">
.select-item:hover svg {
  @apply text-primary-color;
}

.select-item:hover span {
  @apply text-primary-color;
}
.multiple-select-display {
  scrollbar-width: 0;
}
.multiple-select-display::-webkit-scrollbar {
  display: none;
  width: 0;
  height: 0;
  opacity: 0;
}
.multiple-select-display::-webkit-scrollbar-thumb {
  display: none;
}
.multiple-select-display::-webkit-scrollbar-track {
  display: none;
}
</style>
