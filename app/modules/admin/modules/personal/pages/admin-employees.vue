<script lang="ts" setup>
useSeoMeta({
  title: "Sport Food | Admin Employees",
});

definePageMeta({
  middleware: "auth",
  layout: "admin",
  name: "Сотрудники",
});
</script>

<template>
  <div class="w-full h-full">

    <EmployeesTable />
  </div>
</template>

<style scoped></style>
