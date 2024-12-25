<script lang="ts" setup>
useSeoMeta({
  title: "Sport Food | Payment Archive",
});

definePageMeta({
  middleware: "auth",
  layout: "admin",
  name: "Архив оплат",
});
</script>

<template>
  <div class="w-full h-full flex flex-col justify-between pb-[70px]">
    <RequestsTable />
  </div>
</template>

<style scoped></style>
