<script lang="ts" setup>
import { useAdminStore } from "~/modules/admin/stores/admin";
import { useLocalitiesStore } from "~/modules/admin/stores/localities";

useSeoMeta({
  title: "Sport Food | Setting Vendors",
});

definePageMeta({
  middleware: "auth",
  layout: "admin",
  name: "Поставщики",
});

const { getSuppliers } = useCrudSuppliersResponse();
const localitiesStore = useLocalitiesStore();
const adminStore = useAdminStore();
const changePage = async (page: number) => {
  const currentTab = adminStore.activeOpenTab; // Сохраняем текущую активную вкладку
  localitiesStore.suppliersPage = page;
  await getSuppliers();
  adminStore.activeOpenTab = currentTab;
};
const totalPages = computed(() => {
  if (localitiesStore.supplierPagination) {
    return Math.ceil(
      localitiesStore.supplierPagination.total /
        localitiesStore.supplierPagination.per_page
    );
  } else {
    return 0;
  }
});

onMounted(async () => {
  await getSuppliers();
});
</script>

<template>
  <div class="w-full h-full flex flex-col justify-between pb-[70px]">
    <SettingsSuppliersTable />
    <div
      class="h-[90px] py-[12px] px-[24px] border-t border-gray-15"
      v-if="
        localitiesStore.supplierPagination &&
        localitiesStore.supplierPagination.total > localitiesStore.perPage
      "
    >
      <UiAdminPagination
        :total-pages="totalPages"
        :current-page="localitiesStore.citiesPage"
        v-model:model-value="localitiesStore.citiesPage"
        @update:model-value="changePage($event)"
      />
    </div>
  </div>
</template>

<style scoped></style>
