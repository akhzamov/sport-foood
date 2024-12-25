<script lang="ts" setup>
import { useAdminStore } from "~/modules/admin/stores/admin";
import { getDrivers } from "../components/Drivers/drivers.data";
import { usePersonalStore } from "~/modules/admin/stores/personal";

useSeoMeta({
  title: "Sport Food | Admin Drivers",
});

definePageMeta({
  middleware: "auth",
  layout: "admin",
  name: "Водители",
});

const route = useRoute();
const personalStore = usePersonalStore();
const totalPages = computed(() => {
  if (personalStore.driversPagination) {
    return Math.ceil(
      personalStore.driversPagination.total /
        personalStore.driversPagination.per_page
    );
  } else {
    return 0;
  }
});
const changePage = (value: number) => {
  personalStore.employeesPage = value;
  getDrivers();
};
</script>

<template>
  <div class="w-full h-full flex flex-col justify-between pb-[70px]">
    <DriversTable />
    <div
      class="h-[90px] py-[12px] px-[24px] border-t border-gray-15-color"
      v-if="
        personalStore.driversPagination &&
        personalStore.driversPagination.total > personalStore.driversPerPage
      "
    >
      <UiAdminPagination
        :total-pages="totalPages"
        :current-page="personalStore.employeesPage"
        v-model:model-value="personalStore.employeesPage"
        @update:model-value="changePage"
      />
    </div>
  </div>
</template>

<style scoped></style>
