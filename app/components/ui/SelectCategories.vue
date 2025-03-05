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
    mainTextColor: "text-gray-90",
    selectBgColor: "bg-gray-90",
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
const selectRef = useTemplateRef<HTMLElement>("selectRef");
onClickOutside(selectRef, () => emit("update:showMenu", false));

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

const isArray = (data: unknown): data is any[] => Array.isArray(data);

const getArrayFromProps = () => {
  return isArray(props.array) ? props.array : Object.values(props.array);
};

const selectItem = (id: string | number, name: string) => {
  selectedItemId.value = id;
  selectedItemName.value = name;
  emit("update:modelValue", id);
  emit("click:selectItem", id);
  emit("update:showMenu", false);
};

const checkDefaultText = () => {
  if (props.modelValue) {
    selectedItemId.value = props.modelValue;

    const foundItem = getArrayFromProps().find((firstItem: any) => {
      const firstItemArray = isArray(firstItem[props.innerItemKey])
        ? firstItem[props.innerItemKey]
        : Object.values(firstItem[props.innerItemKey]);

      return firstItemArray.some(
        (secondItem: any) => secondItem[props.valueKey] === props.modelValue
      );
    });

    if (foundItem) {
      const firstItemArray = isArray(foundItem[props.innerItemKey])
        ? foundItem[props.innerItemKey]
        : Object.values(foundItem[props.innerItemKey]);

      selectedItemName.value =
        firstItemArray.find(
          (secondItem: any) => secondItem[props.valueKey] === props.modelValue
        )?.[props.labelKey] || "";
    }
  } else if (props.defaultSelectText) {
    selectedItemName.value = props.defaultSelectText;
  }
};

const clearValue = () => {
  emit("update:modelValue", null);
  emit("update:showMenu", false);
  selectedItemId.value = props.modelValue;
  selectedItemName.value = props.defaultSelectText;
};

onMounted(() => {
  checkDefaultText();
});

watch(
  () => props.array,
  () => {
    checkDefaultText();
  },
  { deep: true, immediate: true }
);

watch(
  () => searchValue.value,
  (newSearch) => {
    filteredData.value =
      newSearch.length > 0 ? filterItems(props.array, newSearch) : props.array;
  }
);
</script>

<template>
  <div class="w-[214px] relative" ref="selectRef">
    <div
      class="w-full h-full rounded-lg flex items-center justify-between px-4 select-none cursor-pointer"
      :class="props.selectBgColor"
      @click="emit('update:showMenu', !props.showMenu)"
    >
      <span class="text-14-reg" :class="props.mainTextColor">
        {{ selectedItemName }}
      </span>
      <IconClose
        @click.stop="clearValue()"
        :class="props.mainTextColor"
        v-if="!props.showMenu && selectedItemId"
      />
      <IconChevronUp
        :class="props.mainTextColor"
        v-if="!props.showMenu && !selectedItemId"
      />
      <IconChevronDown :class="props.mainTextColor" v-if="props.showMenu" />
    </div>
    <div
      v-if="props.showMenu"
      class="absolute max-h-[400px] bg-dark-eerie-black top-[105%] left-0 w-full overflow-y-auto rounded-lg px-3 py-3 flex flex-col gap-[10px]"
    >
      <div>
        <input
          v-model="searchValue"
          type="text"
          placeholder="Поиск"
          class="w-full h-[30px] bg-dark-onix rounded-md border border-gray-15 px-2 outline-none text-gray-75"
        />
      </div>
      <div
        v-for="(item, key) in filteredData"
        :key="key"
        class="flex flex-col gap-2"
      >
        <span class="text-16-semi text-gray-40" v-if="!Array.isArray(item)">
          {{ item[props.labelKey] }}
        </span>
        <template v-for="(label, lKey) in item[props.innerItemKey]" :key="lKey">
          <div
            class="flex items-center justify-between pl-3 cursor-pointer hover:text-primary"
            @click="selectItem(label[props.valueKey], label[props.labelKey])"
          >
            <span
              class="text-14-med"
              :class="
                label[props.labelKey] == selectedItemName
                  ? 'text-primary'
                  : 'text-gray-75'
              "
              >{{ label[props.labelKey] }}</span
            >
            <IconCheck
              v-if="label[props.labelKey] == selectedItemName"
              class="text-primary"
            />
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
