<script lang="ts" setup>
import * as yup from "yup";
import { useForm, useField } from "vee-validate";
import { useMainStore } from "~/stores/main";
import { russiaRegions } from "~/data/localData";

const schema = yup.object({
  selectedRegion: yup
    .array()
    .nullable()
    .min(1, "Выберите Город")
    .required("Выберите область"),
  city: yup.string().required("Введите название города"),
});
interface ISchemaForm {
  selectedRegion: string[];
  city: string;
}
const initialValues: ISchemaForm = {
  selectedRegion: [],
  city: "",
};
const { handleSubmit } = useForm<ISchemaForm>({
  validationSchema: schema,
  initialValues,
});
const { value: selectedRegion, errorMessage: selectedRegionError } =
  useField<string[]>("selectedRegion");
const { value: city, errorMessage: cityError } = useField<string>("city");

const mainStore = useMainStore();
const selectRegionMenu = ref(false);

const onSubmit = handleSubmit(async (values) => {
  try {
  } catch (error) {
    console.error("Ошибка при создании водителя: ", error);
  }
});
</script>

<template>
  <form
    v-if="!mainStore.isLoading"
    @submit.prevent="onSubmit"
    class="w-full h-max bg-dark-gunmental-color rounded-tr-md rounded-b-md p-3"
  >
    <div class="w-full h-max flex items-start justify-between gap-3 mt-3">
      <div class="w-full h-full flex flex-col">
        <label class="text-12-reg text-gray-90-color mb-1"
          >Выберите область</label
        >
        <div class="flex gap-1">
          <UiSelect
            main-text-color="text-gray-90-color"
            select-bg-color="bg-gray-15-color"
            disable-text-color="text-gray-40-color"
            disable-bg-color="bg-gray-15-color"
            :array="russiaRegions"
            :show-menu="selectRegionMenu"
            default-select-text="Выбрать область"
            v-model:model-value="selectedRegion"
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
          v-if="selectedRegionError"
          class="text-14-ext text-error-500 mt-[2px]"
        >
          {{ selectedRegionError }}
        </span>
      </div>
      <div class="w-full h-full flex flex-col">
        <label class="text-12-reg text-gray-90-color mb-1">
          Название города
        </label>
        <UiInput
          v-model:model-value="city"
          placeholder="Москва"
          type="text"
          class="text-gray-90-color"
        />
        <span v-if="cityError" class="text-14-ext text-error-500 mt-[2px]">
          {{ cityError }}
        </span>
      </div>
    </div>
    <div
      class="w-full h-[1px] block mt-3 border border-dashed border-gray-15-color"
    ></div>
    <div class="flex items-center justify-between gap-2 mt-3">
      <UiButton
        bgColor="bg-gray-15-color"
        :border="true"
        :icon="false"
        hover="opacity-[0.9]"
        textColor="text-gray-90-color"
        border-color="border-gray-90-color"
        text="Отмена"
        class="w-[93px]"
        type="button"
      >
      </UiButton>
      <UiButton
        bgColor="bg-primary-color"
        :border="false"
        :icon="false"
        hover="opacity-[0.9]"
        textColor="text-dark-night-color"
        text="Создать"
        class="w-[93px]"
        type="submit"
        @click="onSubmit"
      />
    </div>
  </form>
  <div
    v-else
    class="sticky z-[20] w-full h-[400px] flex items-center justify-center bg-dark-gunmental-color rounded-tr-md rounded-b-md p-3"
  >
    <div class="loader"></div>
  </div>
</template>

<style scoped></style>
