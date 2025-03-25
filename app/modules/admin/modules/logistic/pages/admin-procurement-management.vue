<script lang="ts" setup>
import { useAdminStore } from "~/modules/admin/stores/admin";
import { useLogisticStore } from "~/modules/admin/stores/logistic";

useSeoMeta({
  title: "Admin | Управление закупами",
});

definePageMeta({
  middleware: "auth",
  layout: "admin",
  name: "Управление закупами",
});

const { getShipments, getShipment } = useCrudLogisticResponse();
const { getSuppliers } = useCrudSuppliersResponse();
const { getDrivers } = useCrudDriversResponse();
const { getCitiesByArea } = useCrudCitiesResponse();
const { getProducts } = useCrudProductsResponse();
// const {} = useCrud
const logisticStore = useLogisticStore();
const adminStore = useAdminStore();
const changePage = async (page: number) => {
  const currentTab = adminStore.activeOpenTab; // Сохраняем текущую активную вкладку
  logisticStore.shipmentsPage = page;
  await getShipments();
  adminStore.activeOpenTab = currentTab;
};
const totalPages = computed(() => {
  if (logisticStore.shipmentsPagination) {
    return Math.ceil(
      logisticStore.shipmentsPagination.total /
        logisticStore.shipmentsPagination.per_page
    );
  } else {
    return 0;
  }
});

onMounted(async () => {
  await getShipments();
  await getShipment();
  await getSuppliers();
  await getDrivers();
  await getCitiesByArea();
  await getProducts();
});
</script>

<template>
  <div class="w-full h-full flex flex-col justify-between pb-[70px]">
    <LogisticsTable />
    <div
      class="h-[90px] py-[12px] px-[24px] border-t border-gray-15"
      v-if="
        logisticStore.shipmentsPagination &&
        logisticStore.shipmentsPagination.total > logisticStore.perPage
      "
    >
      <UiAdminPagination
        :total-pages="totalPages"
        :current-page="logisticStore.shipmentsPage"
        v-model:model-value="logisticStore.shipmentsPage"
        @update:model-value="changePage($event)"
      />
    </div>
  </div>
</template>

<style scoped></style>
