<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    mainTextColor: string;
    selectBgColor: string;
    array: Record<string, any>;
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
    array: () => ({}),
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
  const result: Record<string, any> = {};
  Object.keys(obj).forEach((key) => {
    const filteredItem = filterNestedItems(obj[key], searchValue);
    if (filteredItem) {
      result[key] = filteredItem;
    }
  });
  return result;
};

const selectItem = (id: string | number, name: string) => {
  selectedItemId.value = id;
  selectedItemName.value = name;
  emit("update:modelValue", id);
  emit("click:selectItem", id);
  emit("update:showMenu", false);
};

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
            class="pl-3 cursor-pointer text-gray-75-color hover:text-primary-color"
            @click="selectItem(label[props.valueKey], label[props.labelKey])"
          >
            <span class="text-14-med">
              {{ label[props.labelKey] }}
            </span>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
