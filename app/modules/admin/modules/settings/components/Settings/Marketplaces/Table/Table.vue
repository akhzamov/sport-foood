<script lang="ts" setup>
import * as yup from "yup";
import { useForm, useField } from "vee-validate";
import { useLocalitiesStore } from "~/modules/admin/stores/localities";
import { useMainStore } from "~/stores/main";

const schema = yup.object({
  name: yup.string().required("Введите название продукта"),
});
interface ISchemaForm {
  name: string;
}
const initialValues: ISchemaForm = {
  name: "",
};
const { handleSubmit, resetForm } = useForm<ISchemaForm>({
  validationSchema: schema,
  initialValues,
});
const { value: name, errorMessage: nameError } = useField<string>("name");

const localitiesStore = useLocalitiesStore();
const mainStore = useMainStore();
const checkbox = ref(false);
const editMarketplaceId = ref<number | null>(null);
const marketplaceEditName = ref("");
const newMarketplaceActive = ref(false);
const newMarketplaceName = ref("");
const {
  getMarketplaces,
  editMarketplace,
  deleteMarketplace,
  createMarketplace,
  getMarketplace,
} = useCrudMarketplacesResponse();

const onDelete = async (id: number) => {
  {
    try {
      await getMarketplace(id);
      const confirmed = await mainStore.showConfirm(
        "warning",
        "Внимательно!",
        `Вы точно хотите удалить торговую площадку: ${localitiesStore.marketplace?.name}?`
      );

      if (confirmed) {
        await deleteMarketplace(id);
        await getMarketplaces();
      } else {
        console.log("Deletion cancelled");
      }
    } catch (error) {
      console.error("Ошибка при удалении торговой площадки: ", error);
    }
  }
};

const onEdit = async (id: number, name: string) => {
  {
    try {
      const body = {
        name: marketplaceEditName.value,
      };
      await editMarketplace(id, body);
      editMarketplaceId.value = null;
      marketplaceEditName.value = "";
      await getMarketplaces();
    } catch (error) {
      console.error("Ошибка при изменении торговой площадки: ", error);
    }
  }
};
const onSubmit = handleSubmit(async (values) => {
  {
    try {
      const body = {
        name: values.name,
      };
      await createMarketplace(body);
      name.value = "";
      newMarketplaceActive.value = false;
      localitiesStore.newMarketplace = null;
      await getMarketplaces();
    } catch (error) {
      console.error("Ошибка при изменении торговой площадки: ", error);
    }
  }
});

const cancelNewMarketplace = () => {
  newMarketplaceActive.value = false;
  name.value = "";
  resetForm();
  localitiesStore.newMarketplace = null;
};

watch(
  () => localitiesStore.newMarketplace,
  () => {
    if (localitiesStore.newMarketplace) {
      newMarketplaceActive.value = true;
    } else {
      newMarketplaceActive.value = false;
    }
  },
  { deep: true }
);
</script>

<template>
  <div class="w-full h-full overflow-auto">
    <SettingsMarketplacesTableTop />
    <table class="w-full">
      <thead class="w-full">
        <tr
          class="w-full h-[32px] flex items-center justify-center text-12-med text-gray-40 border-b border-gray-40"
        >
          <th class="w-[36px] flex items-center justify-center">№</th>
          <!-- <th class="w-[46px] flex items-center justify-center">
            <UiCheckbox v-model:model-value="checkbox" />
          </th> -->
          <th
            class="min-w-[385px] flex-grow flex items-center justify-start ml-3"
          >
            <span>Название</span>
          </th>
        </tr>
      </thead>
      <tbody v-if="localitiesStore.marketplaces" class="overflow-auto">
        <template
          v-for="marketplace in localitiesStore.marketplaces"
          :key="marketplace.id"
        >
          <tr
            class="w-full h-[36px] flex items-center hover:bg-gray-15 border-b border-gray-40"
          >
            <th
              class="w-[36px] flex items-center justify-center text-14-reg text-gray-75"
            >
              {{ marketplace.id }}
            </th>
            <!-- <th
              class="w-[46px] h-[36px] relative flex items-center justify-center gap-1 text-14-reg text-gray-75 rounded"
            >
              <UiCheckbox v-model:model-value="checkbox" />
            </th> -->
            <th
              class="w-[385px] flex items-center justify-start ml-3 text-14-reg text-gray-75"
            >
              <div
                class="flex items-center justify-start gap-4"
                v-if="editMarketplaceId != marketplace.id"
              >
                <div
                  class="min-w-[165px] w-max h-[28px] px-3 bg-gray-15 rounded-lg shadow-xl flex items-center justify-start"
                >
                  {{ marketplace.name }}
                </div>
                <div class="flex items-center justify-start gap-1">
                  <div
                    class="w-8 h-8 flex items-center justify-center cursor-pointer"
                    @click="
                      editMarketplaceId = marketplace.id;
                      marketplaceEditName = marketplace.name;
                    "
                  >
                    <IconEdit05 class="text-gray-40" />
                  </div>
                  <div
                    class="w-8 h-8 flex items-center justify-center cursor-pointer"
                    @click="onDelete(marketplace.id)"
                  >
                    <IconTrash03 class="text-gray-40" />
                  </div>
                </div>
              </div>
              <div
                class="flex items-center justify-start gap-4"
                v-if="editMarketplaceId == marketplace.id"
              >
                <UiInput
                  v-model:model-value="marketplaceEditName"
                  placeholder="Имя торговой площадки"
                  type="string"
                  class="min-w-[165px] w-max max-h-[28px]"
                />
                <div class="flex items-center justify-start gap-1">
                  <UiButton
                    bgColor="bg-gray-15"
                    :border="true"
                    :icon="false"
                    hover="opacity-[0.9]"
                    textColor="text-gray-90"
                    border-color="border-gray-90"
                    text="Отмена"
                    class="w-[93px] max-h-[28px]"
                    type="button"
                    @click="
                      editMarketplaceId = null;
                      marketplaceEditName = '';
                    "
                  >
                  </UiButton>
                  <UiButton
                    bgColor="bg-primary"
                    :border="false"
                    :icon="false"
                    hover="opacity-[0.9]"
                    textColor="text-dark-night"
                    text="Сохранить"
                    class="w-[93px] max-h-[28px]"
                    type="submit"
                    @click="onEdit(marketplace.id, marketplace.name)"
                  />
                </div>
              </div>
            </th>
          </tr>
        </template>
        <tr
          v-if="newMarketplaceActive"
          class="w-full h-[36px] flex items-center hover:bg-gray-15 border-b border-gray-40"
        >
          <th
            class="w-[36px] flex items-center justify-center text-14-reg text-gray-75"
          >
            N
          </th>
          <th
            class="w-[46px] h-[36px] relative flex items-center justify-center gap-1 text-14-reg text-gray-75 rounded"
          >
            <UiCheckbox v-model:model-value="checkbox" />
          </th>
          <th
            class="w-[385px] flex items-center justify-start ml-3 text-14-reg text-gray-75"
          >
            <div class="flex items-center justify-start gap-4">
              <UiInput
                v-model:model-value="name"
                placeholder="Имя торговой площадки"
                type="string"
                class="min-w-[165px] w-max max-h-[28px]"
                :class="[nameError ? 'border border-error-500' : '']"
              />
              <div class="flex items-center justify-start gap-1">
                <UiButton
                  bgColor="bg-gray-15"
                  :border="true"
                  :icon="false"
                  hover="opacity-[0.9]"
                  textColor="text-gray-90"
                  border-color="border-gray-90"
                  text="Отмена"
                  class="w-[93px] max-h-[28px]"
                  type="button"
                  @click="cancelNewMarketplace()"
                >
                </UiButton>
                <UiButton
                  bgColor="bg-primary"
                  :border="false"
                  :icon="false"
                  hover="opacity-[0.9]"
                  textColor="text-dark-night"
                  text="Сохранить"
                  class="w-[93px] max-h-[28px]"
                  type="submit"
                  @click="onSubmit()"
                />
              </div>
            </div>
          </th>
        </tr>
      </tbody>
      <div
        v-if="!localitiesStore.marketplaces"
        class="w-full h-[600px] flex items-center justify-center"
      >
        <div class="loader"></div>
      </div>
      <div
        v-if="localitiesStore.marketplaces?.length == 0"
        class="w-full h-[600px] flex items-center justify-center"
      >
        <span class="text-16-med text-gray-75">
          Нет данных для отображение
        </span>
      </div>
    </table>
  </div>
</template>

<style scoped>
.image-hover {
  @apply absolute top-0 left-0 translate-y-[-25%] translate-x-[-25%] min-w-[76px] max-w-[76px] h-[76px] z-[20];
}
</style>
