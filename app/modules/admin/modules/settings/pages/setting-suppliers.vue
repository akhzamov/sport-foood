<script lang="ts" setup>
import { useAdminStore } from "~/modules/admin/stores/admin";

useSeoMeta({
  title: "Sport Food | Setting Vendors",
});

definePageMeta({
  middleware: "auth",
  layout: "admin",
  name: "Поставщики",
});

const { getSuppliers } = useCrudSuppliersResponse();
const adminStore = useAdminStore();
const changePage = async (page: number) => {
  const currentTab = adminStore.activeOpenTab; // Сохраняем текущую активную вкладку
  adminStore.suppliersPage = page;
  await getSuppliers();
  adminStore.activeOpenTab = currentTab;
};
const totalPages = computed(() => {
  if (adminStore.supplierPagination) {
    return Math.ceil(
      adminStore.supplierPagination.total /
        adminStore.supplierPagination.per_page
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
        adminStore.supplierPagination &&
        adminStore.supplierPagination.total > adminStore.perPage
      "
    >
      <UiAdminPagination
        :total-pages="totalPages"
        :current-page="adminStore.citiesPage"
        v-model:model-value="adminStore.citiesPage"
        @update:model-value="changePage($event)"
      />
    </div>
  </div>
</template>

<style scoped></style>
