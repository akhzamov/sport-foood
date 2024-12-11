<script lang="ts" setup>
import { useAdminStore } from "~/modules/admin/stores/admin";
import { getDrivers } from "../components/Drivers/drivers.data";

useSeoMeta({
  title: "Sport Food | Admin Drivers",
});

definePageMeta({
  middleware: "auth",
  layout: "admin",
  name: "Водители",
});

const route = useRoute();
const adminStore = useAdminStore();
const totalPages = computed(() => {
  if (adminStore.driversPagination) {
    return Math.ceil(
      adminStore.driversPagination.total / adminStore.driversPagination.per_page
    );
  } else {
    return 0;
  }
});
const changePage = (value: number) => {
  adminStore.employeesPage = value;
  getDrivers();
};
</script>

<template>
  <div class="w-full h-full flex flex-col justify-between pb-[70px]">
    <DriversTable />
    <div
      class="h-[90px] py-[12px] px-[24px] border-t border-gray-15-color"
      v-if="
        adminStore.driversPagination &&
        adminStore.driversPagination.total > adminStore.driversPerPage
      "
    >
      <UiAdminPagination
        :total-pages="totalPages"
        :current-page="adminStore.employeesPage"
        v-model:model-value="adminStore.employeesPage"
        @update:model-value="changePage"
      />
    </div>
  </div>
</template>

<style scoped></style>
