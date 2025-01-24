<script lang="ts" setup>
useSeoMeta({
  title: "Sport Food | Setting Products",
});

definePageMeta({
  middleware: "auth",
  layout: "admin",
  name: "Продукты",
});

onMounted(async () => {});
</script>

<template>
  <div class="w-full h-full flex flex-col justify-between pb-[70px]">
    Products
  </div>
</template>

<style scoped></style>
