<script lang="ts" setup>
import { ref, watch } from "vue";
import { useAdminLogisticsStore } from "~/modules/admin/modules/logistic/stores/adminLogistics";

// Pinia store
const adminLogisticsStore = useAdminLogisticsStore();

// Props
const props = withDefaults(
  defineProps<{
    showSelectMenu: boolean;
    selectedProduct: number | null;
    products: any;
  }>(),
  {
    showSelectMenu: false,
    selectedProduct: null,
  }
);

// Emit
const emit = defineEmits(["update:selectedProduct", "update:showSelectMenu"]);

// Local state to track
const localSelectedProduct = ref(props.selectedProduct);
const localShowSelectMenu = ref(props.showSelectMenu);
const localWeight = ref<number | null>(null);
const localCount = ref<number | null>(null);
const localPrice = ref<number | null>(null);

// Watchers to sync local state with props
watch(
  () => props.selectedProduct,
  (newValue) => {
    localSelectedProduct.value = newValue;
  }
);

watch(
  () => props.showSelectMenu,
  (newValue) => {
    localShowSelectMenu.value = newValue;
  }
);

// Close modal function
const closeAddCityModal = () => {
  adminLogisticsStore.addProductModal = false;
  adminLogisticsStore.showSelectMenuProductModal = false;
  adminLogisticsStore.selectedItemProductModal = null;
};

// Update selected city function
const updateSelectedCity = () => {
  emit("update:selectedProduct", localSelectedProduct.value);
  adminLogisticsStore.addProductModal = false;
  adminLogisticsStore.showSelectMenuProductModal = false;
  adminLogisticsStore.selectedItemProductModal = null;
};

// Update show select menu function
const updateShowSelectMenu = (newValue: boolean) => {
  localShowSelectMenu.value = newValue;
  emit("update:showSelectMenu", newValue);
};
</script>

<template>
  <div
    class="alert-modal fixed z-[300] top-0 left-0 w-full h-screen flex justify-center items-center bg-gray-40 select-none"
    @click="closeAddCityModal()"
  >
    <div
      @click.stop
      class="relative w-[400px] h-max bg-dark-gunmental rounded-xl border-[1px] border-gray-15 p-6 flex flex-col items-center justify-center"
    >
      <div class="w-full flex items-center justify-between">
        <h4 class="text-24-bold text-white mb-1 text-center">Товар</h4>
        <IconClose
          class="text-gray-75 cursor-pointer"
          @click="closeAddCityModal()"
        />
      </div>
      <div class="w-full flex flex-col items-start justify-start mt-4">
        <label class="text-12-reg text-gray-90">Продукт</label>
        <div class="w-full flex items-center justify-start gap-2 mt-1">
          <UiSelect
            main-text-color="text-gray-90"
            select-bg-color="bg-gray-15"
            disable-text-color="text-gray-40"
            disable-bg-color="bg-gray-15"
            :array="props.products"
            :show-menu="props.showSelectMenu"
            default-select-text="Товар"
            v-model:model-value="props.selectedProduct"
            :icon="false"
            value-key="id"
            label-key="name"
            @update:show-menu="updateShowSelectMenu"
            @update:model-value="localSelectedProduct = $event"
            width="w-full"
            :text-center="false"
            :disable="false"
            class="h-[40px] flex-grow"
          />
          <button
            class="min-w-[40px] h-[40px] flex items-center justify-center bg-gray-15 rounded-lg"
          >
            <IconSettings class="text-gray-90" />
          </button>
        </div>
      </div>
      <div class="w-full flex items-start justify-start mt-4 gap-3">
        <div>
          <label class="text-12-reg text-gray-90 mb-1">Вес</label>
          <UiInput
            v-model:model-value="localWeight"
            placeholder="100"
            type="number"
          />
        </div>
        <div>
          <label class="text-12-reg text-gray-90 mb-1">Количество</label>
          <UiInput
            v-model:model-value="localCount"
            placeholder="20"
            type="number"
          />
        </div>
      </div>
      <div class="w-full flex flex-col items-start justify-start mt-4">
        <label class="text-12-reg text-gray-90 mb-1">Цена за кг.</label>
        <UiInput
          v-model:model-value="localPrice"
          placeholder="500 руб."
          type="number"
        />
      </div>
      <div class="w-full flex items-center justify-end gap-2 mt-4">
        <UiButton
          text="Добавить"
          bg-color="bg-primary"
          text-color="text-dark-night"
          hover="opacity-90"
          :border="false"
          :icon="false"
          class="max-w-[100px]"
          @click="updateSelectedCity()"
        />
        <UiButton
          text="Отмена"
          bg-color="bg-gray-15"
          text-color="text-gray-90"
          border-color="border-gray-90"
          hover="bg-gray-25"
          :border="true"
          :icon="false"
          class="max-w-[90px]"
          @click="closeAddCityModal()"
        />
      </div>
    </div>
  </div>
</template>

<style></style>
