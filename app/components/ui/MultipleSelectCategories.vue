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
    innerItemKey: string;
    textCenter: boolean;
    disable: boolean;
  }>(),
  {
    mainTextColor: "text-gray-90",
    selectBgColor: "bg-gray-90",
    array: () => [],
    defaultSelectText: "",
    valueKey: "id",
    labelKey: "name",
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
const searchValue = ref("");
let filteredArray = reactive(props.array);
const selectRef = useTemplateRef<HTMLElement>("selectRef");
onClickOutside(selectRef, () => emit("update:showMenu", false));

const isArray = (data: unknown): data is any[] => Array.isArray(data);

const getArrayFromProps = () => {
  return isArray(filteredArray) ? filteredArray : Object.values(filteredArray);
};

const filterItems = (array: any[], search: string) => {
  return array
    .map((item) => ({
      ...item,
      cities: filterNestedItems(item.cities, search),
    }))
    .filter((item) => item.cities);
};

const filterNestedItems = (item: any, searchValue: string) => {
  if (Array.isArray(item)) {
    return item.filter((label: any) =>
      label[props.labelKey]?.toLowerCase().includes(searchValue.toLowerCase())
    );
  } else if (typeof item === "object" && item !== null) {
    const filteredItem: Record<string, any> = {};
    Object.keys(item).forEach((key) => {
      const value = item[key];
      if (
        typeof value === "string" &&
        value.toLowerCase().includes(searchValue.toLowerCase())
      ) {
        filteredItem[key] = value;
      } else if (Array.isArray(value) || typeof value === "object") {
        const filteredNested = filterNestedItems(value, searchValue);
        if (filteredNested) {
          filteredItem[key] = filteredNested;
        }
      }
    });
    return Object.keys(filteredItem).length > 0 ? filteredItem : null;
  }
  return null;
};

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

const removeItem = (index: number) => {
  if (index >= 0 && index < state.selectedItemIds.length) {
    state.selectedItemIds.splice(index, 1);
  }
  if (index >= 0 && index < state.selectedItems.length) {
    state.selectedItems.splice(index, 1);
  }
};

const filterObject = (obj: Record<string, any>, searchValue: string) => {
  let result: Record<string, any> = {};
  Object.keys(obj).forEach((key) => {
    const filteredItem = filterNestedItems(obj[key], searchValue);
    if (filteredItem) {
      result[key] = filteredItem;
    }
  });
  return result;
};

const checkDefaultText = () => {
  if (props.modelValue) {
    const modelArray = Array.isArray(props.modelValue)
      ? [...props.modelValue]
      : [props.modelValue];

    state.selectedItemIds = modelArray;

    state.selectedItems = modelArray.map((id) => {
      const foundItem = getArrayFromProps()
        .flatMap((first) => {
          const innerItems = first[props.innerItemKey] as Record<string, any>;
          return innerItems ? Object.values(innerItems) : [];
        })
        .find((item: any) => item[props.valueKey] === id);
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

watch(
  () => searchValue.value,
  () => {
    filteredArray =
      searchValue.value.length > 1
        ? Array.isArray(props.array)
          ? filterItems(props.array, searchValue.value)
          : filterObject(props.array, searchValue.value)
        : props.array;
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
  <div class="w-[214px] h-[40px] relative" ref="selectRef">
    <div
      class="w-full h-full rounded-lg flex items-center justify-between px-4 select-none"
      :class="[
        props.selectBgColor,
        props.disable ? 'cursor-not-allowed' : 'cursor-pointer',
      ]"
      @click="emit('update:showMenu', !props.showMenu)"
    >
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
        :class="[props.disable ? props.disableTextColor : props.mainTextColor]"
        v-if="!props.showMenu && !props.disable"
      />
      <IconChevronDown
        :class="[props.disable ? props.disableTextColor : props.mainTextColor]"
        v-else
      />
    </div>
    <div
      v-if="props.showMenu && !props.disable"
      class="absolute max-h-[400px] bg-dark-eerie-black top-[105%] left-0 w-full overflow-y-auto rounded-lg px-3 py-3 flex flex-col gap-[10px]"
    >
      <div @click.stop>
        <input
          v-model="searchValue"
          type="text"
          placeholder="Поиск города"
          class="w-full h-[30px] bg-dark-onix rounded-md border border-gray-15 px-2 outline-none text-gray-75"
        />
      </div>
      <div
        v-for="(item, key) in getArrayFromProps()"
        :key="key"
        class="flex flex-col gap-2"
      >
        <span class="text-16-semi text-gray-40">{{
          item[props.labelKey]
        }}</span>
        <template v-for="(label, lKey) in item[props.innerItemKey]" :key="lKey">
          <div
            class="flex items-center justify-between pl-3 cursor-pointer hover:text-primary"
            @click="selectItem(label[props.valueKey], label[props.labelKey])"
            :class="[
              state.selectedItems.includes(label[props.labelKey])
                ? 'text-primary'
                : 'text-gray-75',
            ]"
          >
            <span class="text-14-med">{{ label[props.labelKey] }}</span>
            <IconCheck
              v-if="state.selectedItems.includes(label[props.labelKey])"
              class="w-[18px] h-[18px]"
            />
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
