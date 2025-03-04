<script lang="ts" setup>
useSeoMeta({
  title: "Sport Food | Setting Products",
});

definePageMeta({
  middleware: "auth",
  layout: "admin",
  name: "Продукты",
});

const { getProducts } = useCrudProductsResponse();

onMounted(async () => {
  await getProducts();
});
</script>

<template>
  <div class="w-full h-full flex flex-col justify-between pb-[70px]">
    <SettingsProductsTable />
  </div>
</template>

<style scoped></style>
