<script lang="ts" setup>
useSeoMeta({
  title: "Sport Food | Setting Vendors",
});

definePageMeta({
  middleware: "auth",
  layout: "admin",
  name: "Поставщики",
});

onMounted(async () => {});
</script>

<template>
  <div class="w-full h-full flex flex-col justify-between pb-[70px]">
    Vendors
  </div>
</template>

<style scoped></style>
