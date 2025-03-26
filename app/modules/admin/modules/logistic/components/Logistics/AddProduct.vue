<script lang="ts" setup>
import * as yup from "yup";
import { useForm, useField } from "vee-validate";
import { ref, watch } from "vue";
import { useAdminLogisticsStore } from "~/modules/admin/modules/logistic/stores/adminLogistics";
import { useLogisticStore } from "~/modules/admin/stores/logistic";
import type { ISchemaProductAdd } from "../../types/Logistics/schemaForm.type";

// Props
const props = withDefaults(
  defineProps<{
    showSelectMenu: boolean;
    showSelectPackage: boolean;
    selectedProduct: number | null;
    products: any;
  }>(),
  {
    showSelectMenu: false,
    selectedProduct: null,
    selectedPackage: null,
  }
);

const schema = yup.object({
  productId: yup.number().nullable().required("Выберите продукт"),
  packageId: yup.number().nullable().required("Выберите фасовку"),
  count: yup
    .number()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .nullable("Введите количество в цифрах")
    .required("Введите количество")
    .min(0, "Количество не может быть минусовой"),
  price: yup
    .number()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .nullable("Введите цену в цифрах")
    .required("Введите цену за кг")
    .min(0, "Цена не может быть минусовой"),
});

const initialValues: ISchemaProductAdd = {
  productId: null,
  packageId: null,
  count: null,
  price: null,
};

const { handleSubmit, resetForm } = useForm<ISchemaProductAdd>({
  validationSchema: schema,
  initialValues,
});

const { value: productId, errorMessage: productIdError } = useField<number | null>("productId");
const { value: packageId, errorMessage: packageIdError } = useField<number | null>("packageId");
const { value: count, errorMessage: countError } = useField<number | null>("count");
const { value: price, errorMessage: priceError } = useField<number | null>("price");

const adminLogisticsStore = useAdminLogisticsStore();

const emit = defineEmits(["update:selectedProduct", "update:showSelectMenu", "update:showSelectWeightMenu"]);

const logisticStore = useLogisticStore();
const localSelectedProduct = ref(props.selectedProduct);
const localShowSelectMenu = ref(props.showSelectMenu);
const localShowSelectWeightMenu = ref(props.showSelectPackage);
const localPackageName = ref<string>("");

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
const updateSelectedCity = handleSubmit((values) => {
  const product = {
    id: values.productId,
    packageId: values.packageId,
    packageName: localPackageName.value,
    quantity: values.count,
    kg_price: values.price,
  };
  emit("update:selectedProduct", product);
  adminLogisticsStore.addProductModal = false;
  adminLogisticsStore.showSelectMenuProductModal = false;
  adminLogisticsStore.selectedItemProductModal = null;
  resetForm();
});

// Update show select menu function
const updateShowSelectMenu = (newValue: boolean) => {
  localShowSelectMenu.value = newValue;
  emit("update:showSelectMenu", newValue);
};
const updateShowSelectWeightMenu = (newValue: boolean) => {
  localShowSelectWeightMenu.value = newValue;
  emit("update:showSelectWeightMenu", newValue);
};
const selectPackage = (id: number) => {
  packageId.value = id;

  const foundPackage = logisticStore.shipmentPackages
    ?.flatMap((item) => item.packages)
    .find((pkg) => pkg.id === id);

  if (foundPackage) {
    localPackageName.value = foundPackage.value;
  }
};
</script>

<template>
  <div
    class="alert-modal fixed z-[300] top-0 left-0 w-full h-screen flex justify-center items-center bg-gray-40 select-none"
    @click="closeAddCityModal()"
  >
    <div
      @click.stop
      class="relative w-[500px] h-max bg-dark-gunmental rounded-xl border-[1px] border-gray-15 p-6 flex flex-col items-center justify-center"
    >
      <div class="w-full flex items-center justify-between">
        <h4 class="text-24-bold text-white mb-1 text-center">Товар</h4>
        <IconClose class="text-gray-75 cursor-pointer" @click="closeAddCityModal()" />
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
            v-model:model-value="productId"
            :icon="false"
            value-key="id"
            label-key="name"
            @update:show-menu="updateShowSelectMenu"
            @update:model-value="localSelectedProduct = $event"
            width="w-full"
            :text-center="false"
            :disable="false"
            class="z-[60] h-[40px] flex-grow"
          />
        </div>
        <span v-if="productIdError" class="text-14-ext text-error-500 mt-[2px]">
          {{ productIdError }}
        </span>
      </div>
      <div class="w-full flex items-start justify-start mt-4 gap-1">
        <div class="w-[50%]">
          <label class="text-12-reg text-gray-90 mb-1">Фасовка</label>
          <UiSelectCategories
            v-model:model-value="packageId"
            :show-menu="props.showSelectPackage"
            :array="logisticStore.shipmentPackages ?? []"
            :icon="false"
            :is-object="false"
            default-select-text="Выберите фасовку"
            select-bg-color="bg-gray-15"
            main-text-color="text-gray-90"
            value-key="id"
            label-key="value"
            inner-item-key="packages"
            @update:model-value="selectPackage($event)"
            @update:show-menu="updateShowSelectWeightMenu"
            class="z-[30] h-[40px] flex-grow"
          />
          <span v-if="packageIdError" class="text-14-ext text-error-500 mt-[2px]">
            {{ packageIdError }}
          </span>
        </div>
        <div class="w-[50%]">
          <label class="text-12-reg text-gray-90 mb-1">Количество</label>
          <UiInput v-model:model-value="count" placeholder="20" type="number" />
          <span v-if="countError" class="text-14-ext text-error-500 mt-[2px]">
            {{ countError }}
          </span>
        </div>
      </div>
      <div class="w-full flex flex-col items-start justify-start mt-4">
        <label class="text-12-reg text-gray-90 mb-1">Цена за кг.</label>
        <UiInput v-model:model-value="price" placeholder="500 руб." type="number" />
        <span v-if="priceError" class="text-14-ext text-error-500 mt-[2px]">
          {{ priceError }}
        </span>
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
