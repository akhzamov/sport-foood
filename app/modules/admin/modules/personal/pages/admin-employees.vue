<script lang="ts" setup>
import { getUsers } from "../components/Employees/employees.data";

useSeoMeta({
  title: "Sport Food | Admin Employees",
});

definePageMeta({
  middleware: "auth",
  layout: "admin",
  name: "Сотрудники",
});

onMounted(() => {
  getUsers();
});
</script>

<template>
  <div class="w-full h-full">
    <EmployeesTable />
  </div>
</template>

<style scoped></style>
