<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    mainTextColor: string;
    selectBgColor: string;
    array: Record<string, any>;
    showMenu: boolean;
    defaultSelectText: string;
    modelValue: any;
    iconCheck: boolean;
    valueKey: string;
    labelKey: string;
    innerItemKey: string;
  }>(),
  {
    mainTextColor: "text-gray-90-color",
    selectBgColor: "bg-gray-90-color",
    array: () => ({}),
    defaultSelectText: "",
    iconCheck: false,
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
let filteredObject = reactive(props.array);

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

const selectItem = (id: string | number, name: string) => {
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

const removeItem = (index: number) => {
  if (index >= 0 && index < state.selectedItemIds.length) {
    state.selectedItemIds.splice(index, 1);
  }
  if (index >= 0 && index < state.selectedItems.length) {
    state.selectedItems.splice(index, 1);
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
    filteredObject = filterObject(props.array, searchValue.value);
  },
  { deep: true }
);
</script>

<template>
  <div class="w-[214px] h-[40px] relative">
    <div
      class="w-full h-full rounded-lg flex items-center justify-between px-4 select-none cursor-pointer"
      :class="props.selectBgColor"
      @click="emit('update:showMenu', !props.showMenu)"
    >
      <div
        class="w-full flex items-center justify-start gap-1 overflow-hidden cursor-auto multiple-select-display"
        v-if="state.selectedItems.length > 0"
      >
        <div
          class="w-max h-[22px] flex items-center gap-1 pl-2 pr-1 rounded-[20px] bg-gray-15-color text-gray-90-color text-12-reg"
          :class="props.mainTextColor"
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
        class="text-14-reg"
        :class="props.mainTextColor"
        v-if="state.selectedItems.length == 0"
      >
        {{ defaultSelectText }}
      </span>
      <IconChevronUp :class="props.mainTextColor" v-if="!props.showMenu" />
      <IconChevronDown :class="props.mainTextColor" v-else />
    </div>
    <div
      v-if="props.showMenu"
      class="absolute max-h-[400px] bg-dark-eerie-black-color top-[105%] left-0 w-full overflow-y-auto rounded-lg px-3 py-3 flex flex-col gap-[10px]"
    >
      <div>
        <input
          v-model="searchValue"
          type="text"
          placeholder="Поиск города"
          class="w-full h-[30px] bg-dark-onix-color rounded-md border border-gray-15-color px-2 outline-none text-gray-75-color"
        />
      </div>
      <div
        v-for="(item, key) in filteredObject"
        :key="key"
        class="flex flex-col gap-2"
      >
        <span class="text-16-semi text-gray-40-color">
          {{ item[props.labelKey] }}
        </span>
        <template v-for="(label, lKey) in item[props.innerItemKey]" :key="lKey">
          <div
            class="flex items-center justify-between pl-3 cursor-pointer hover:text-primary-color"
            @click="selectItem(label[props.valueKey], label[props.labelKey])"
            :class="[
              state.selectedItems.includes(label[props.labelKey])
                ? 'text-primary-color'
                : 'text-gray-75-color',
            ]"
          >
            <span class="text-14-med">
              {{ label[props.labelKey] }}
            </span>
            <IconCheck
              v-if="
                state.selectedItems.includes(label[props.labelKey]) &&
                props.iconCheck
              "
              class="w-[18px] h-[18px]"
            />
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
