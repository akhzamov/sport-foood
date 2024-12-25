<script lang="ts" setup>
import { useAdminStore } from "~/modules/admin/stores/admin";
import { getUsers } from "~/modules/admin/modules/personal/components/Employees/employees.data";
import { usePersonalStore } from "~/modules/admin/stores/personal";

useSeoMeta({
  title: "Sport Food | Admin Employees",
});

definePageMeta({
  middleware: "auth",
  layout: "admin",
  name: "Сотрудники",
});

const personalStore = usePersonalStore();
const totalPages = computed(() => {
  if (personalStore.employeesPagination) {
    return Math.ceil(
      personalStore.employeesPagination.total /
        personalStore.employeesPagination.per_page
    );
  } else {
    return 0;
  }
});
const changePage = (value: number) => {
  personalStore.employeesPage = value;
  getUsers();
};
</script>

<template>
  <div class="w-full h-full flex flex-col justify-between pb-[70px]">
    <EmployeesTable />
    <div
      class="h-[90px] py-[12px] px-[24px] border-t border-gray-15-color"
      v-if="
        personalStore.employeesPagination &&
        personalStore.employeesPagination.total > personalStore.employeesPerPage
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
