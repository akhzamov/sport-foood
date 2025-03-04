<script lang="ts" setup>
import { createDriverById } from "./drivers.data";
import { useAdminStore } from "~/modules/admin/stores/admin";
import * as yup from "yup";
import { useForm, useField } from "vee-validate";
import { useMainStore } from "~/stores/main";
import { usePersonalStore } from "~/modules/admin/stores/personal";

const schema = yup.object({
  name: yup
    .string()
    .required("Введите Имя Фамилия")
    .min(6, "Не должно быть меньше 6-и символов"),
  contact: yup
    .string()
    .required("Введите контактные данные")
    .min(6, "Не должно быть меньше 6-и символов"),
  selectedCity: yup.number().required("Выберите город").nullable(),
});
interface ISchemaForm {
  name: string;
  contact: string;
  selectedCity: number;
}
const { handleSubmit } = useForm<ISchemaForm>({
  validationSchema: schema,
});
const { value: name, errorMessage: nameError } = useField<string>("name");
const { value: contact, errorMessage: contactError } =
  useField<string>("contact");
const { value: selectedCity, errorMessage: selectedCityError } =
  useField<number>("selectedCity");

const personalStore = usePersonalStore();
const mainStore = useMainStore();
const status = ref("");
const cost = ref<number | null>(null);
const statusMenu = ref(false);
const files = ref(null);

const onSubmit = handleSubmit(async (values) => {
  try {
    if (!nameError.value && !contactError.value && !selectedCityError.value) {
      let data = {
        name: values.name,
        contact: values.contact,
        city_id: values.selectedCity,
      };
      await createDriverById(data);
    }
  } catch (error) {
    console.error("Ошибка при создании водителя: ", error);
  }
});
</script>

<template>
  <form
    v-if="personalStore.driverAreas && !mainStore.isLoading"
    @submit.prevent="onSubmit"
    class="w-full h-max bg-dark-gunmental rounded-tr-md rounded-b-md p-3"
  >
    <div class="flex items-center justify-between gap-3 mt-3">
      <div class="w-full flex flex-col">
        <label class="text-12-reg text-gray-90 mb-1"> Имя Фамилия </label>
        <UiInput
          v-model:model-value="name"
          placeholder="Дмитрий Павлов"
          type="text"
          class="text-gray-90"
        />
        <span v-if="nameError" class="text-14-ext text-error-500 mt-[2px]">
          {{ nameError }}
        </span>
      </div>
      <div class="w-full flex flex-col">
        <label class="text-12-reg text-gray-90 mb-1"> Контакт </label>
        <UiInput
          v-model:model-value="contact"
          placeholder="Телефон или почта"
          type="text"
          class="text-gray-90"
        />
        <span v-if="contactError" class="text-14-ext text-error-500 mt-[2px]">
          {{ contactError }}
        </span>
      </div>
    </div>
    <div class="flex items-center justify-between gap-3 mt-3">
      <div class="w-full flex flex-col">
        <label class="text-12-reg text-gray-90 mb-1"> Статус </label>
        <UiInput
          v-model:model-value="status"
          placeholder="Активный"
          type="text"
          class="text-gray-90"
          disabled
        />
        <!-- <span v-if="nameError" class="text-14-ext text-error-500 mt-[2px]">
          {{ nameError }}
        </span> -->
      </div>
      <div class="w-full flex flex-col">
        <label class="text-12-reg text-gray-90 mb-1">Город</label>
        <div class="flex gap-1">
          <UiSelectCategories
            v-model:model-value="selectedCity"
            default-select-text="Выбрать город"
            :show-menu="statusMenu"
            :array="personalStore.driverAreas"
            select-bg-color="bg-gray-15"
            main-text-color="text-gray-90"
            class="flex-grow z-[70]"
            @update:show-menu="statusMenu = $event"
            :icon="false"
            :is-object="true"
            value-key="id"
            label-key="name"
            inner-item-key="cities"
          />
        </div>
        <span
          v-if="selectedCityError"
          class="text-14-ext text-error-500 mt-[2px]"
        >
          {{ selectedCityError }}
        </span>
      </div>
    </div>
    <div class="flex items-center justify-between gap-3 mt-3">
      <div class="w-full flex flex-col">
        <label class="text-12-reg text-gray-90 mb-1">
          Оплата за километр
        </label>
        <UiInput
          v-model:model-value="cost"
          placeholder="0.00 руб"
          type="number"
          class="text-gray-90"
        />
      </div>
      <div class="w-full flex flex-col">
        <label class="text-12-reg text-gray-90 mb-1"
          >Прикрепление документов</label
        >
        <UiSelectPhoto v-model:model-value="files" :length="4" />
      </div>
    </div>
    <div
      class="w-full h-[1px] block mt-3 border border-dashed border-gray-40"
    ></div>
    <div class="flex items-center justify-end gap-2 mt-3">
      <UiButton
        bgColor="bg-primary"
        :border="false"
        :icon="false"
        hover="opacity-[0.9]"
        textColor="text-dark-night"
        text="Создать"
        class="max-w-[110px]"
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
