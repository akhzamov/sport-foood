<script lang="ts" setup>
import { useAdminStore } from "~/modules/admin/stores/admin";
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
const { getDrivers } = useCrudDriversResponse();
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
  personalStore.employeesPage = value;
  getDrivers();
};

onMounted(async () => {
  await getDrivers();
});
</script>

<template>
  <div class="w-full h-full flex flex-col justify-between pb-[70px]">
    <DriversTable />
    <div
      class="h-[90px] py-[12px] px-[24px] border-t border-gray-15"
      v-if="
        adminStore.driversPagination &&
        adminStore.driversPagination.total > adminStore.perPage
      "
    >
      <UiAdminPagination
        :total-pages="totalPages"
        :current-page="personalStore.driversPage"
        v-model:model-value="personalStore.driversPage"
        @update:model-value="changePage"
      />
    </div>
  </div>
</template>

<style scoped></style>
