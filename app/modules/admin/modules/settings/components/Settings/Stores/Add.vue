<script lang="ts" setup>
import * as yup from "yup";
import { useForm, useField } from "vee-validate";
import { useMainStore } from "~/stores/main";
import { useLocalitiesStore } from "~/modules/admin/stores/localities";
import { useAdminStore } from "~/modules/admin/stores/admin";

const schema = yup.object({
  name: yup.string().required("Введите название Магазина"),
  sort: yup.number().nullable().required("Введите приоритет"),
  selectedProducts: yup
    .array()
    .required("Выберите продукты")
    .min(1, "Выберите хотя бы 1 товар"),
  selectedCities: yup
    .array()
    .required("Выберите продукты")
    .min(1, "Выберите хотя бы 1 товар"),
  syncStoreId: yup.number().nullable(),
});
interface ISchemaForm {
  name: string;
  sort: number | null;
  selectedProducts: number[];
  selectedCities: number[];
  syncStoreId: number | null;
}
const initialValues: ISchemaForm = {
  name: "",
  sort: null,
  selectedProducts: [],
  selectedCities: [],
  syncStoreId: null,
};
const { handleSubmit, resetForm } = useForm<ISchemaForm>({
  validationSchema: schema,
  initialValues,
});

const { value: name, errorMessage: nameError } = useField<string>("name");
const { value: sort, errorMessage: sortError } = useField<number>("sort");
const { value: selectedProducts, errorMessage: selectedProductsError } =
  useField<number[]>("selectedProducts");
const { value: selectedCities, errorMessage: selectedCitiesError } =
  useField<number[]>("selectedCities");
const { value: syncStoreId, errorMessage: syncStoreIdError } =
  useField<null>("syncStoreId");

const mainStore = useMainStore();
const adminStore = useAdminStore();
const localitiesStore = useLocalitiesStore();
const selectRegionMenu = ref(false);
const { createStore, getCrudStores } = useCrudStoresResponse();
const { closeTab } = useTabs();
const photo = ref<Record<number, File> | null>(null);
const productsMenu = ref(false);
const citiesMenu = ref(false);
const storeMenu = ref(false);

const onSubmit = handleSubmit(async (values) => {
  if (values.sort) {
    try {
      const body: {
        name: string;
        sort: number;
        syncStoreId?: number;
        products: number[];
        cities: number[];
      } = {
        name: values.name,
        sort: values.sort,
        products: values.selectedProducts,
        cities: values.selectedCities,
      };
      if (values.syncStoreId) {
        body.syncStoreId = values.syncStoreId;
      }
      if (photo.value) {
        await createStore(body, photo.value[0]);
      } else {
        await createStore(body);
      }
      resetForm();
      setTimeout(async () => {
        await getCrudStores();
      }, 2000);
    } catch (error) {
      console.error("Ошибка при создании города: ", error);
    }
  }
});
</script>

<template>
  <form
    v-if="!mainStore.isLoading"
    @submit.prevent="onSubmit"
    class="w-full h-max bg-dark-gunmental rounded-tr-md rounded-b-md p-3"
  >
    <div class="w-full h-max flex items-start justify-between gap-3 mt-3">
      <div class="w-[50%] flex flex-col gap-3">
        <div class="w-full h-full flex flex-col">
          <label class="text-12-reg text-gray-90 mb-1">
            Название магазина
          </label>
          <UiInput
            v-model:model-value="name"
            placeholder="Магазин 1"
            type="text"
            class="text-gray-90"
          />
          <span v-if="nameError" class="text-14-ext text-error-500 mt-[2px]">
            {{ nameError }}
          </span>
        </div>
        <div class="w-full h-full flex flex-col">
          <label class="text-12-reg text-gray-90 mb-1">Приоритет</label>
          <UiInput
            v-model:model-value="sort"
            placeholder="1"
            type="number"
            class="text-gray-90"
          />
          <span v-if="sortError" class="text-14-ext text-error-500 mt-[2px]">
            {{ sortError }}
          </span>
        </div>
      </div>
      <div class="w-[50%] flex flex-col">
        <div class="w-full h-full flex flex-col">
          <label class="text-12-reg text-gray-90 mb-1"> Фотография </label>
          <div class="flex gap-1">
            <UiSelectPhoto
              :length="1"
              v-model:model-value="photo"
              class="w-[80px] h-[80px]"
            />
          </div>
        </div>
      </div>
    </div>
    <div
      class="w-full h-[1px] block mt-3 border border-dashed border-gray-15"
    ></div>
    <div class="w-full mt-3">
      <UiMultipleSelect
        main-text-color="text-gray-90"
        select-bg-color="bg-gray-15"
        disable-text-color="text-gray-40"
        disable-bg-color="bg-gray-15"
        :array="localitiesStore.products ?? []"
        :show-menu="productsMenu"
        default-select-text="Товары"
        v-model:model-value="selectedProducts"
        value-key="id"
        label-key="name"
        @update:show-menu="productsMenu = $event"
        :text-center="false"
        :disable="false"
        class="w-full z-[70]"
      />
    </div>
    <div class="w-full mt-3">
      <UiMultipleSelectCategories
        main-text-color="text-gray-90"
        select-bg-color="bg-gray-15"
        disable-text-color="text-gray-40"
        disable-bg-color="bg-gray-15"
        :array="localitiesStore.citiesByArea ?? []"
        :show-menu="citiesMenu"
        default-select-text="Города"
        v-model:model-value="selectedCities"
        value-key="id"
        label-key="name"
        inner-item-key="cities"
        @update:show-menu="citiesMenu = $event"
        :text-center="false"
        :disable="false"
        class="w-full z-[60]"
      />
    </div>
    <div class="w-full mt-3">
      <UiSelect
        main-text-color="text-gray-90"
        select-bg-color="bg-gray-15"
        disable-text-color="text-gray-40"
        disable-bg-color="bg-gray-15"
        :array="localitiesStore.stores ?? []"
        :show-menu="storeMenu"
        default-select-text="Магазин для синхронизации"
        v-model:model-value="syncStoreId"
        :icon="false"
        value-key="id"
        label-key="name"
        @update:show-menu="storeMenu = $event"
        width="w-full"
        :text-center="false"
        :disable="false"
        class="h-[40px] z-[50]"
      />
    </div>
    <div class="flex items-center justify-between gap-2 mt-3">
      <UiButton
        bgColor="bg-gray-15"
        :border="true"
        :icon="false"
        hover="opacity-[0.9]"
        textColor="text-gray-90"
        border-color="border-gray-90"
        text="Отмена"
        class="w-[93px]"
        type="button"
        @click="closeTab('settings-store-add')"
      >
      </UiButton>
      <UiButton
        bgColor="bg-primary"
        :border="false"
        :icon="false"
        hover="opacity-[0.9]"
        textColor="text-dark-night"
        text="Создать"
        class="w-[93px]"
        type="submit"
        @click="onSubmit"
      />
    </div>
  </form>
  <div
    v-else
    class="sticky z-[20] w-full h-[400px] flex items-center justify-center bg-dark-gunmental rounded-tr-md rounded-b-md p-3"
  >
    <div class="loader"></div>
  </div>
</template>

<style scoped></style>
