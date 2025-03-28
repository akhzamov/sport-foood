<script lang="ts" setup>
import * as yup from "yup";
import { useForm, useField } from "vee-validate";
import { useMainStore } from "~/stores/main";
import { useAdminStore } from "~/modules/admin/stores/admin";

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

const adminStore = useAdminStore();
const mainStore = useMainStore();
const cost = ref<number | null>(null);
const statusMenu = ref(false);
const files = ref(null);
const { closeTab } = useTabs();
const { editDriverById, getDriverById } = useCrudDriversResponse();

const onSubmit = handleSubmit(async (values) => {
  try {
    if (
      !nameError.value &&
      !contactError.value &&
      !selectedCityError.value &&
      adminStore.openUser
    ) {
      const data = {
        name: values.name,
        contact: values.contact,
        city_id: values.selectedCity,
      };
      editDriverById(adminStore.openUser, data);
    }
  } catch (error) {
    console.error("Ошибка при изменении водителя: ", error);
  }
});

onMounted(async () => {
  await getDriverById(adminStore.openUser ? adminStore.openUser : 0);
  if (adminStore.driver) {
    name.value = adminStore.driver.name;
    contact.value = adminStore.driver.contact;
    selectedCity.value = adminStore.driver.city.id;
  }
});
</script>

<template>
  <div
    v-if="adminStore.driver && adminStore.citiesByArea && !mainStore.isLoading"
    class="w-full h-max bg-dark-gunmental rounded-tr-md rounded-b-md p-3"
  >
    <div class="h-max flex items-start justify-between gap-3 mt-3">
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
    <div class="flex items-start justify-between gap-3 mt-3">
      <div class="w-full flex flex-col">
        <label class="text-12-reg text-gray-90 mb-1"> Статус </label>
        <UiInput
          v-model:model-value="adminStore.driver.status"
          placeholder="Активный"
          type="text"
          class="text-gray-90"
          disabled
        />
      </div>
      <div class="w-full flex flex-col">
        <label class="text-12-reg text-gray-90 mb-1">Город</label>
        <div class="flex gap-1">
          <UiSelectCategories
            v-model:model-value="selectedCity"
            :default-select-text="adminStore.driver.city.name"
            :show-menu="statusMenu"
            :array="adminStore.citiesByArea"
            select-bg-color="bg-gray-15"
            main-text-color="text-gray-90"
            @update:show-menu="statusMenu = $event"
            :icon="false"
            :is-object="true"
            value-key="id"
            label-key="name"
            inner-item-key="cities"
            class="flex-grow z-[70] h-[40px]"
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
    <div class="flex items-start justify-between gap-3 mt-3">
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
        @click="closeTab(`drivers-edit-${adminStore.openUser}`)"
      >
      </UiButton>
      <div class="flex items-center justify-center gap-4">
        <UiButton
          bgColor="bg-transparent"
          :border="false"
          :icon="true"
          hover="opacity-[0.9]"
          textColor="text-error-500"
          text="Удалить"
          class="max-w-[120px] px-0"
        >
          <template v-slot:icon>
            <IconTrash03 class="text-error-500 w-[24px] h-[24px]" />
          </template>
        </UiButton>
        <UiButton
          bgColor="bg-primary"
          :border="false"
          :icon="false"
          hover="opacity-[0.9]"
          textColor="text-dark-night"
          text="Сохранить"
          class="max-w-[110px]"
          @click="onSubmit"
        />
      </div>
    </div>
  </div>
  <div
    v-else
    class="sticky z-[20] w-full h-[400px] flex items-center justify-center bg-dark-gunmental rounded-tr-md rounded-b-md p-3"
  >
    <div class="loader"></div>
  </div>
</template>

<style scoped></style>
