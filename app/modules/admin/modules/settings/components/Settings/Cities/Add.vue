<script lang="ts" setup>
import * as yup from "yup";
import { useForm, useField } from "vee-validate";
import { useMainStore } from "~/stores/main";
import { useAdminStore } from "~/modules/admin/stores/admin";

const schema = yup.object({
  selectedArea: yup.number().nullable().required("Выберите область"),
  city: yup.string().required("Введите название города"),
});
interface ISchemaForm {
  selectedArea: number | null;
  city: string;
}
const initialValues: ISchemaForm = {
  selectedArea: null,
  city: "",
};
const { handleSubmit, resetForm } = useForm<ISchemaForm>({
  validationSchema: schema,
  initialValues,
});
const { value: selectedArea, errorMessage: selectedAreaError } = useField<
  number | null
>("selectedArea");
const { value: city, errorMessage: cityError } = useField<string>("city");

const mainStore = useMainStore();
const adminStore = useAdminStore();
const selectRegionMenu = ref(false);
const { createCity, getCities } = useCrudCitiesResponse();
const { closeTab } = useTabs();

const onSubmit = handleSubmit(async (values) => {
  if (values.selectedArea) {
    try {
      const body = {
        name: values.city,
        area_id: values.selectedArea,
      };
      await createCity(body);
      resetForm();
      await getCities();
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
      <div class="w-full h-full flex flex-col">
        <label class="text-12-reg text-gray-90 mb-1"> Выберите область </label>
        <div class="flex gap-1">
          <UiSelect
            main-text-color="text-gray-90"
            select-bg-color="bg-gray-15"
            disable-text-color="text-gray-40"
            disable-bg-color="bg-gray-15"
            :array="adminStore.areas ?? []"
            :show-menu="selectRegionMenu"
            default-select-text="Выбрать область"
            v-model:model-value="selectedArea"
            :icon="false"
            value-key="id"
            label-key="name"
            @update:show-menu="selectRegionMenu = $event"
            width="w-full"
            :text-center="false"
            :disable="false"
            class="h-[40px] flex-grow z-[70]"
          />
        </div>
        <span
          v-if="selectedAreaError"
          class="text-14-ext text-error-500 mt-[2px]"
        >
          {{ selectedAreaError }}
        </span>
      </div>
      <div class="w-full h-full flex flex-col">
        <label class="text-12-reg text-gray-90 mb-1"> Название города </label>
        <UiInput
          v-model:model-value="city"
          placeholder=""
          type="text"
          class="text-gray-90"
        />
        <span v-if="cityError" class="text-14-ext text-error-500 mt-[2px]">
          {{ cityError }}
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
        @click="closeTab('settings-city-add')"
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
