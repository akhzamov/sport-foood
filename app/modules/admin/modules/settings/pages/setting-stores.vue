<script lang="ts" setup>
useSeoMeta({
  title: "Sport Food | Setting Stores",
});

definePageMeta({
  middleware: "auth",
  layout: "admin",
  name: "Магазины",
});

const { getCrudStores } = useCrudStoresResponse();
const { getProducts } = useCrudProductsResponse();

onMounted(async () => {
  await getCrudStores();
  await getProducts();
});
</script>

<template>
  <div class="w-full h-full flex flex-col justify-between pb-[70px]">
    <SettingsStoresTable />
  </div>
</template>

<style scoped></style>
