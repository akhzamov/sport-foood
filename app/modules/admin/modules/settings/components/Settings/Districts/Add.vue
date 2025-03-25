<script lang="ts" setup>
import * as yup from "yup";
import { useForm, useField } from "vee-validate";
import { useMainStore } from "~/stores/main";
import { useAdminStore } from "~/modules/admin/stores/admin";

const schema = yup.object({
  selectedCity: yup.number().nullable().required("Выберите город"),
  district: yup.string().required("Введите название района"),
});
interface ISchemaForm {
  selectedCity: number | null;
  district: string;
}
const initialValues: ISchemaForm = {
  selectedCity: null,
  district: "",
};
const { handleSubmit, resetForm } = useForm<ISchemaForm>({
  validationSchema: schema,
  initialValues,
});
const { value: selectedCity, errorMessage: selectedCityError } = useField<
  number | null
>("selectedCity");
const { value: district, errorMessage: districtError } =
  useField<string>("district");

const mainStore = useMainStore();
const adminStore = useAdminStore();
const selectRegionMenu = ref(false);
const { createDistrict, getDistricts } = useCrudDistrictsResponse();
const { closeTab } = useTabs();

const onSubmit = handleSubmit(async (values) => {
  if (values.selectedCity) {
    try {
      const body = {
        name: values.district,
        city_id: values.selectedCity,
      };
      await createDistrict(body);
      resetForm();
      await getDistricts();
    } catch (error) {
      console.error("Ошибка при создании района: ", error);
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
      <div class="w-full h-full flex flex-col">
        <label class="text-12-reg text-gray-90 mb-1">Выберите город</label>
        <div class="flex gap-1">
          <UiSelectCategories
            main-text-color="text-gray-90"
            select-bg-color="bg-gray-15"
            :array="adminStore.citiesByArea ?? []"
            :show-menu="selectRegionMenu"
            default-select-text="Выбрать город"
            v-model:model-value="selectedCity"
            :icon="false"
            value-key="id"
            label-key="name"
            inner-item-key="cities"
            :is-object="false"
            @update:show-menu="selectRegionMenu = $event"
            class="h-[40px] flex-grow z-[70]"
          />
        </div>
        <span
          v-if="selectedCityError"
          class="text-14-ext text-error-500 mt-[2px]"
        >
          {{ selectedCityError }}
        </span>
      </div>
      <div class="w-full h-full flex flex-col">
        <label class="text-12-reg text-gray-90 mb-1"> Название района </label>
        <UiInput
          v-model:model-value="district"
          placeholder=""
          type="text"
          class="text-gray-90"
        />
        <span v-if="districtError" class="text-14-ext text-error-500 mt-[2px]">
          {{ districtError }}
        </span>
      </div>
    </div>
    <div
      class="w-full h-[1px] block mt-3 border border-dashed border-gray-15"
    ></div>
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
        @click="closeTab('settings-district-add')"
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
