<script lang="ts" setup>
import * as yup from "yup";
import { useForm, useField } from "vee-validate";
import { useMainStore } from "~/stores/main";
import { useAdminStore } from "~/modules/admin/stores/admin";

const schema = yup.object({
  name: yup.string().required("Введите название продукта"),
  description: yup.string(),
});
interface ISchemaForm {
  name: string;
  description: string;
}
const initialValues: ISchemaForm = {
  name: "",
  description: "",
};
const { handleSubmit } = useForm<ISchemaForm>({
  validationSchema: schema,
  initialValues,
});
const { value: name, errorMessage: nameError } = useField<string>("name");
const { value: description, errorMessage: descriptionError } =
  useField<string>("description");

const mainStore = useMainStore();
const adminStore = useAdminStore();
const file = ref<Record<string, File> | null>(null);
const { getProduct, deleteProduct, getProducts, editProduct } =
  useCrudProductsResponse();
const { closeTab } = useTabs();

const onDelete = handleSubmit(async (values) => {
  try {
    const confirmed = await mainStore.showConfirm(
      "warning",
      "Внимание",
      `Вы точно хотите удалить продукт: ${adminStore.product?.name}?`
    );

    if (confirmed) {
      await deleteProduct(adminStore.openUser ?? 0);
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
      getProducts();
    } else {
      console.log("Deletion cancelled");
    }
  } catch (error) {
    console.error("Ошибка при удалении водителя: ", error);
  }
});

const onSubmit = handleSubmit(async (values) => {
  try {
    const id = Number(adminStore.openUser ?? 0);
    const body = {
      name: values.name,
      description: values.description,
    };
    if (file.value) {
      await editProduct(id, body, file.value[0]);
    } else {
      await editProduct(id, body);
    }
    await getProducts();
  } catch (error) {
    console.error("Ошибка при создании водителя: ", error);
  }
});

const getImageSrc = (imageUrl: string) => {
  const baseUrl = "https://crm-api.autosale.pw/"; // Укажи свой домен

  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
    return imageUrl; // Если уже полный URL, оставляем как есть
  }
  return baseUrl + imageUrl; // Если относительный путь, добавляем домен
};

onMounted(async () => {
  mainStore.isLoading = true;
  await getProduct(adminStore.openUser ?? 0);
  if (adminStore.product) {
    name.value = adminStore.product?.name;
    description.value = adminStore.product?.description ?? "";
  }
  mainStore.isLoading = false;
});
onUnmounted(() => {
  name.value = "";
  description.value = "";
  file.value = null;
});
</script>

<template>
  <form
    v-if="!mainStore.isLoading && adminStore.product"
    @submit.prevent="onSubmit"
    class="w-full h-max bg-dark-gunmental rounded-tr-md rounded-b-md p-3"
  >
    <div class="w-full h-max flex items-start justify-center gap-3">
      <div class="w-[140px] h-[158px] flex flex-col">
        <span class="text-12-reg text-gray-90 mb-1">Фотография</span>
        <UiSelectPhoto
          :length="1"
          :images="[getImageSrc(adminStore.product.image)]"
          v-model:model-value="file"
          class="w-[140px] h-[140px]"
        />
      </div>
      <div class="h-max flex flex-grow flex-col items-start gap-3">
        <div class="w-full h-full flex flex-col">
          <label class="text-12-reg text-gray-90 mb-1">
            Название продукта
          </label>
          <div class="flex gap-1">
            <UiInput
              v-model:model-value="name"
              type="text"
              placeholder=""
              class="text-gray-90"
            />
          </div>
          <span v-if="nameError" class="text-14-ext text-error-500 mt-[2px]">
            {{ nameError }}
          </span>
        </div>
        <div class="w-full h-full flex flex-col">
          <label class="text-12-reg text-gray-90 mb-1">Примечание</label>
          <UiTextarea
            v-model:model-value="description"
            placeholder=""
            class="text-gray-90 h-[70px]"
          />
          <span
            v-if="descriptionError"
            class="text-14-ext text-error-500 mt-[2px]"
          >
            {{ descriptionError }}
          </span>
        </div>
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
        @click="closeTab(`settings-product-edit-${adminStore.openUser}`)"
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
          text="Сохранить"
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
