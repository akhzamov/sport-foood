<script lang="ts" setup>
useSeoMeta({
  title: "Admin | Управление закупами",
});

definePageMeta({
  middleware: "auth",
  layout: "admin",
  name: "Управление закупами",
});
</script>

<template>
  <div class="w-full h-full overflow-y-hidden">
    <LogisticsHead />
    <LogisticsTable />
  </div>
</template>

<style scoped></style>
