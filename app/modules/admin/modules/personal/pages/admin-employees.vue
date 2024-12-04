<script lang="ts" setup>
import { useAdminStore } from "~/modules/admin/stores/admin";
import { getUsers } from "~/modules/admin/modules/personal/components/Employees/employees.data";

useSeoMeta({
  title: "Sport Food | Admin Employees",
});

definePageMeta({
  middleware: "auth",
  layout: "admin",
  name: "Сотрудники",
});

const adminStore = useAdminStore();
const totalPages = computed(() => {
  if (adminStore.employeesPagination) {
    return Math.ceil(
      adminStore.employeesPagination.total /
        adminStore.employeesPagination.per_page
    );
  } else {
    return 0;
  }
});
const changePage = (value: number) => {
  adminStore.employeesPage = value;
  getUsers();
};
</script>

<template>
  <div class="w-full h-full flex flex-col justify-between pb-[70px]">
    <EmployeesTable />
    <div
      class="h-[90px] py-[12px] px-[24px] border-t border-gray-15-color"
      v-if="
        adminStore.employeesPagination &&
        adminStore.employeesPagination.total > adminStore.employeesPerPage
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
