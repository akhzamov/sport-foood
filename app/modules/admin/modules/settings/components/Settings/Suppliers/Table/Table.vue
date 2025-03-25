<script lang="ts" setup>
import * as yup from "yup";
import { useForm, useField } from "vee-validate";
import { useAdminStore } from "~/modules/admin/stores/admin";
import { useMainStore } from "~/stores/main";

const schema = yup.object({
  name: yup.string().required("Введите название поставщика"),
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

const adminStore = useAdminStore();
const mainStore = useMainStore();
const editSupplierId = ref<number | null>(null);
const supplierEditName = ref("");
const newSupplierActive = ref(false);
const {
  getSuppliers,
  getSupplier,
  deleteSupplier,
  editSupplier,
  createSupplier,
} = useCrudSuppliersResponse();

const onDelete = async (id: number) => {
  {
    try {
      await getSupplier(id);
      const confirmed = await mainStore.showConfirm(
        "warning",
        "Внимание",
        `Вы точно хотите удалить поставщика: ${adminStore.supplier?.name}?`
      );

      if (confirmed) {
        await deleteSupplier(id);
        await getSuppliers();
      } else {
        console.log("Deletion cancelled");
      }
    } catch (error) {
      console.error("Ошибка при удалении поставщика: ", error);
    }
  }
};

const onEdit = async (id: number, name: string) => {
  {
    try {
      const body = {
        name: supplierEditName.value,
      };
      await editSupplier(id, body);
      editSupplierId.value = null;
      supplierEditName.value = "";
      await getSuppliers();
    } catch (error) {
      console.error("Ошибка при изменении поставщика: ", error);
    }
  }
};
const onSubmit = handleSubmit(async (values) => {
  {
    try {
      const body = {
        name: values.name,
      };
      await createSupplier(body);
      name.value = "";
      newSupplierActive.value = false;
      adminStore.newMarketplace = null;
      await getSuppliers();
    } catch (error) {
      console.error("Ошибка при создании поставщика: ", error);
    }
  }
});

const cancelNewMarketplace = () => {
  newSupplierActive.value = false;
  name.value = "";
  resetForm();
  adminStore.newMarketplace = null;
};

watch(
  () => adminStore.newMarketplace,
  () => {
    if (adminStore.newMarketplace) {
      newSupplierActive.value = true;
    } else {
      newSupplierActive.value = false;
    }
  },
  { deep: true }
);
</script>

<template>
  <div class="w-full h-full overflow-auto">
    <SettingsSuppliersTableTop />
    <table class="w-full">
      <thead class="w-full">
        <tr
          class="w-full h-[32px] flex items-center justify-center text-12-med text-gray-40 border-b border-gray-40"
        >
          <th class="w-[36px] flex items-center justify-center">№</th>
          <th
            class="min-w-[385px] flex-grow flex items-center justify-start ml-3"
          >
            <span>Название</span>
          </th>
        </tr>
      </thead>
      <tbody v-if="adminStore.suppliers" class="overflow-auto">
        <template v-for="supplier in adminStore.suppliers" :key="supplier.id">
          <tr
            class="w-full h-[36px] flex items-center hover:bg-gray-15 border-b border-gray-40"
          >
            <th
              class="w-[36px] flex items-center justify-center text-14-reg text-gray-75"
            >
              {{ supplier.id }}
            </th>
            <th
              class="w-[385px] flex items-center justify-start ml-3 text-14-reg text-gray-75"
            >
              <div
                class="flex items-center justify-start gap-4"
                v-if="editSupplierId != supplier.id"
              >
                <div
                  class="min-w-[165px] w-max h-[28px] px-3 bg-gray-15 rounded-lg shadow-xl flex items-center justify-start"
                >
                  {{ supplier.name }}
                </div>
                <div class="flex items-center justify-start gap-1">
                  <div
                    class="w-8 h-8 flex items-center justify-center cursor-pointer"
                    @click="
                      editSupplierId = supplier.id;
                      supplierEditName = supplier.name;
                    "
                  >
                    <IconEdit05 class="text-gray-40" />
                  </div>
                  <div
                    class="w-8 h-8 flex items-center justify-center cursor-pointer"
                    @click="onDelete(supplier.id)"
                  >
                    <IconTrash03 class="text-gray-40" />
                  </div>
                </div>
              </div>
              <div
                class="flex items-center justify-start gap-4"
                v-if="editSupplierId == supplier.id"
              >
                <UiInput
                  v-model:model-value="supplierEditName"
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
                      editSupplierId = null;
                      supplierEditName = '';
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
                    @click="onEdit(supplier.id, supplier.name)"
                  />
                </div>
              </div>
            </th>
          </tr>
        </template>
        <tr
          v-if="newSupplierActive"
          class="w-full h-[36px] flex items-center hover:bg-gray-15 border-b border-gray-40"
        >
          <th
            class="w-[36px] flex items-center justify-center text-14-reg text-gray-75"
          >
            N
          </th>
          <th
            class="w-[385px] flex items-center justify-start ml-3 text-14-reg text-gray-75"
          >
            <div class="flex items-center justify-start gap-4">
              <UiInput
                v-model:model-value="name"
                placeholder="Название поставщика"
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
        v-if="!adminStore.suppliers"
        class="w-full h-[600px] flex items-center justify-center"
      >
        <div class="loader"></div>
      </div>
      <div
        v-if="adminStore.suppliers?.length == 0"
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
