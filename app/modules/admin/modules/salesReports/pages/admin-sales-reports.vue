<script lang="ts" setup>
useSeoMeta({
  title: "Sport Food | Sales Reports",
});

definePageMeta({
  middleware: "auth",
  layout: "admin",
  name: "Отчеты по продажам",
});

onMounted(async () => {});
</script>

<template>
  <div class="w-full h-full flex flex-col justify-between pb-[70px]">
    <SalesReportsTable />
  </div>
</template>

<style scoped></style>
