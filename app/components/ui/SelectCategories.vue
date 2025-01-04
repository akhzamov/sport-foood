<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    mainTextColor: string;
    selectBgColor: string;
    array: Record<string, any> | any[];
    showMenu: boolean;
    defaultSelectText: string;
    modelValue: any;
    icon: boolean;
    valueKey: string;
    labelKey: string;
    innerItemKey: string;
    isObject: boolean; // Указывает, объект или массив передан
  }>(),
  {
    mainTextColor: "text-gray-90-color",
    selectBgColor: "bg-gray-90-color",
    array: () => ({}),
    defaultSelectText: "",
    icon: false,
    valueKey: "id",
    labelKey: "name",
    isObject: true,
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

let filteredData = ref(props.array);

const filterItems = (data: any, search: string): any => {
  if (Array.isArray(data)) {
    return data
      .map((item) => {
        const nested =
          props.innerItemKey && Array.isArray(item[props.innerItemKey])
            ? filterItems(item[props.innerItemKey], search)
            : null;

        if (
          item[props.labelKey]?.toLowerCase().includes(search.toLowerCase()) ||
          (nested && nested.length)
        ) {
          return { ...item, [props.innerItemKey]: nested };
        }

        return null;
      })
      .filter(Boolean);
  } else if (typeof data === "object" && data !== null) {
    const filteredObject: Record<string, any> = {};

    Object.entries(data).forEach(([key, value]) => {
      if (
        typeof value === "string" &&
        value.toLowerCase().includes(search.toLowerCase())
      ) {
        filteredObject[key] = value;
      } else if (Array.isArray(value) || typeof value === "object") {
        const nested = filterItems(value, search);
        if (
          nested &&
          (Array.isArray(nested) ? nested.length : Object.keys(nested).length)
        ) {
          filteredObject[key] = nested;
        }
      }
    });

    return Object.keys(filteredObject).length > 0 ? filteredObject : null;
  }

  return null;
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
  (newSearch) => {
    filteredData.value =
      newSearch.length > 0 ? filterItems(props.array, newSearch) : props.array;
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
      <div>
        <input
          v-model="searchValue"
          type="text"
          placeholder="Поиск"
          class="w-full h-[30px] bg-dark-onix-color rounded-md border border-gray-15-color px-2 outline-none text-gray-75-color"
        />
      </div>
      <div
        v-for="(item, key) in filteredData"
        :key="key"
        class="flex flex-col gap-2"
      >
        <span
          class="text-16-semi text-gray-40-color"
          v-if="!Array.isArray(item)"
        >
          {{ item[props.labelKey] }}
        </span>
        <template v-for="(label, lKey) in item[props.innerItemKey]" :key="lKey">
          <div
            class="flex items-center justify-between pl-3 cursor-pointer hover:text-primary-color"
            @click="selectItem(label[props.valueKey], label[props.labelKey])"
          >
            <span
              class="text-14-med"
              :class="
                label[props.labelKey] == selectedItemName
                  ? 'text-primary-color'
                  : 'text-gray-75-color'
              "
              >{{ label[props.labelKey] }}</span
            >
            <IconCheck
              v-if="label[props.labelKey] == selectedItemName"
              class="text-primary-color"
            />
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
