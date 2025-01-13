<script lang="ts" setup>
useSeoMeta({
  title: "Admin | Управление закупами",
});

definePageMeta({
  middleware: "auth",
  layout: "admin",
  name: "Логи",
});
</script>

<template>
  <div class="w-full h-full overflow-y-hidden">
    <!-- <LogisticsHead /> -->
    <HistoryTable />
  </div>
</template>

<style scoped></style>
