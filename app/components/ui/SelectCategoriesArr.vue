<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    mainTextColor: string;
    selectBgColor: string;
    array: any[];
    showMenu: boolean;
    defaultSelectText: string;
    modelValue: any;
    icon: boolean;
    valueKey: string;
    labelKey: string;
    innerItemKey: string;
  }>(),
  {
    mainTextColor: "text-gray-90-color",
    selectBgColor: "bg-gray-90-color",
    array: () => [],
    defaultSelectText: "",
    icon: false,
    valueKey: "id",
    labelKey: "name",
  }
);

const emit = defineEmits([
  "update:modelValue",
  "update:showMenu",
  "click:selectItem",
]);

const selectedItemId = ref(props.modelValue);
const selectedItemName = ref(props.defaultSelectText);
const searchValue = ref("");
let filteredArray = reactive(props.array);

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

const selectItem = (id: string | number, name: string) => {
  selectedItemId.value = id;
  selectedItemName.value = name;
  emit("update:modelValue", id);
  emit("click:selectItem", id);
  emit("update:showMenu", false)
};

const setDefaultItem = () => {
  if (props.array.length > 0) {
    const firstItem = props.array[0];
    selectedItemId.value = firstItem[props.valueKey];
    selectedItemName.value = firstItem[props.labelKey];
    emit("update:modelValue", firstItem[props.valueKey]);
  }
};

watch(
  () => props.array,
  () => {
    if (props.array.length > 0) setDefaultItem();
  },
  { deep: true }
);

watch(
  () => searchValue.value,
  () => {
    filteredArray =
      searchValue.value.length > 1
        ? filterItems(props.array, searchValue.value)
        : props.array;
  }
);
</script>

<template>
  <div class="w-[214px] h-[40px] relative">
    <div
      class="w-full h-full rounded-lg flex items-center justify-between px-4 select-none cursor-pointer"
      :class="props.selectBgColor"
      @click="emit('update:showMenu', !props.showMenu)"
    >
      <span class="text-14-reg" :class="props.mainTextColor">
        {{ selectedItemName }}
      </span>
      <IconChevronUp :class="props.mainTextColor" v-if="!props.showMenu" />
      <IconChevronDown :class="props.mainTextColor" v-else />
    </div>
    <div
      v-if="props.showMenu"
      class="absolute max-h-[400px] bg-dark-eerie-black-color top-[105%] left-0 w-full overflow-y-auto rounded-lg px-3 py-3 flex flex-col gap-[10px]"
    >
      <div @click.stop>
        <input
          v-model="searchValue"
          type="text"
          placeholder="Поиск города"
          class="w-full h-[30px] bg-dark-onix-color rounded-md border border-gray-15-color px-2 outline-none text-gray-75-color"
        />
      </div>
      <div
        v-for="(item, key) in filteredArray"
        :key="key"
        class="flex flex-col gap-2"
      >
        <span class="text-16-semi text-gray-40-color">{{
          item[props.labelKey]
        }}</span>
        <template v-for="(label, lKey) in item[props.innerItemKey]" :key="lKey">
          <div
            class="pl-3 cursor-pointer text-gray-75-color hover:text-primary-color"
            @click="selectItem(label[props.valueKey], label[props.labelKey])"
          >
            <span class="text-14-med text-gray-75-color">
              {{ label[props.labelKey] }}
            </span>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
