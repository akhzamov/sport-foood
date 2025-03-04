<script lang="ts" setup>
import * as yup from "yup";
import { useForm, useField } from "vee-validate";
import { useMainStore } from "~/stores/main";
import { russiaRegions } from "~/data/localData";
import { useLocalitiesStore } from "~/modules/admin/stores/localities";
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
const { handleSubmit } = useForm<ISchemaForm>({
  validationSchema: schema,
  initialValues,
});
const { value: selectedArea, errorMessage: selectedAreaError } = useField<
  number | null
>("selectedArea");
const { value: city, errorMessage: cityError } = useField<string>("city");

const mainStore = useMainStore();
const adminStore = useAdminStore();
const localitiesStore = useLocalitiesStore();
const router = useRouter();
const selectRegionMenu = ref(false);
const { getCity, deleteCity, getCities, editCity } = useCrudCitiesResponse();

const onDelete = handleSubmit(async (values) => {
  try {
    const confirmed = await mainStore.showConfirm(
      "warning",
      "Внимательно!",
      `Вы точно хотите удалить город: ${localitiesStore.city?.name}?`
    );

    if (confirmed) {
      await deleteCity(adminStore.openUser ?? 0);
      let index = adminStore.activeOpenTabs.findIndex(
        (item) => item.id == adminStore.activeOpenTab
      );
      adminStore.activeOpenTabs.splice(index, 1);
      adminStore.activeOpenTab = "";
      adminStore.openUser = null;
      adminStore.activeOpenTab = adminStore.activeOpenTabs[0]?.id;
      const match = adminStore.activeOpenTabs[0]?.title.match(/\d+$/); // Ищем число в конце строки
      const numId = match ? Number(match[0]) : null;
      if (numId) {
        adminStore.openUser = numId;
      }
      getCities();
    } else {
      console.log("Deletion cancelled");
    }
  } catch (error) {
    console.error("Ошибка при удалении водителя: ", error);
  }
});

const onSubmit = handleSubmit(async (values) => {
  if (values.selectedArea) {
    try {
      const id = Number(adminStore.openUser ?? 0);
      const body = {
        name: values.city,
        area_id: values.selectedArea,
      };
      await editCity(id, body);
      selectedArea.value = null;
      city.value = "";
      await getCities();
    } catch (error) {
      console.error("Ошибка при создании водителя: ", error);
    }
  }
});

onBeforeMount(async () => {
  mainStore.isLoading = true;
  await getCity(adminStore.openUser ?? 0);
  selectedArea.value = localitiesStore.city?.area_id ?? null;
  city.value = localitiesStore.city?.name ?? "";
  mainStore.isLoading = false;
});
onUnmounted(() => {
  selectedArea.value = null;
  city.value = "";
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
            v-if="selectedArea"
            main-text-color="text-gray-90"
            select-bg-color="bg-gray-15"
            disable-text-color="text-gray-40"
            disable-bg-color="bg-gray-15"
            :array="localitiesStore.areas ?? []"
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
          placeholder="Москва"
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
      >
      </UiButton>
      <div class="flex items-center justify-center gap-4">
        <UiButton
          bgColor="bg-transparent"
          :border="true"
          border-color="border-error-500"
          :icon="true"
          hover="opacity-[0.9]"
          textColor="text-error-500"
          text="Удалить"
          class="w-[123px]"
          type="submit"
          @click="onDelete"
        >
          <template v-slot:icon>
            <IconTrash03 class="text-error-500" />
          </template>
        </UiButton>
        <UiButton
          bgColor="bg-primary"
          :border="false"
          :icon="false"
          hover="opacity-[0.9]"
          textColor="text-dark-night"
          text="Изменить"
          class="w-[93px]"
          type="submit"
          @click="onSubmit"
        />
      </div>
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
