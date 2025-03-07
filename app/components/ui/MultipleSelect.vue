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
    mainTextColor: "text-gray-90",
    selectBgColor: "bg-gray-15",
    disableTextColor: "text-gray-40",
    disableBgColor: "bg-gray-15",
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
const selectRef = useTemplateRef<HTMLElement>("selectRef");
onClickOutside(selectRef, () => emit("update:showMenu", false));

const isArray = (data: unknown): data is any[] => Array.isArray(data);

const getArrayFromProps = () => {
  return isArray(props.array) ? props.array : Object.values(props.array);
};

// Обработка выбора элемента
const selectItem = (id: number | string, name: string) => {
  const idIndex = state.selectedItemIds.indexOf(id);
  const nameIndex = state.selectedItems.indexOf(name);

  if (idIndex === -1) {
    // Добавляем, если элемент отсутствует
    state.selectedItemIds.push(id);
    state.selectedItems.push(name);
  } else {
    // Удаляем, если элемент уже существует
    state.selectedItemIds.splice(idIndex, 1);
    state.selectedItems.splice(nameIndex, 1);
  }

  // Эмитим изменения
  emit("update:modelValue", state.selectedItemIds);
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

const checkDefaultText = () => {
  if (props.modelValue) {
    const modelArray = Array.isArray(props.modelValue)
      ? [...props.modelValue] // Копируем массив
      : [props.modelValue];

    state.selectedItemIds = modelArray;

    state.selectedItems = modelArray.map((id) => {
      const foundItem = getArrayFromProps().find(
        (item: any) => item[props.valueKey] === id
      );
      return foundItem ? foundItem[props.labelKey] : "";
    });
  } else {
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
  <div class="h-[40px] relative" ref="selectRef">
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
          class="w-max h-[22px] flex items-center gap-1 pl-2 pr-1 rounded-[20px] bg-gray-15 text-gray-90 text-12-reg"
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
        class="absolute bg-dark-eerie-black top-[105%] left-0 w-full rounded-lg px-3 py-3 flex flex-col gap-[10px]"
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
                ? 'text-primary'
                : 'text-gray-90',
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
  @apply text-primary;
}

.select-item:hover span {
  @apply text-primary;
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
