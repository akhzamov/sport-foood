<script lang="ts" setup>
useSeoMeta({
  title: "Sport Food | Setting Trading Marketplaces",
});

definePageMeta({
  middleware: "auth",
  layout: "admin",
  name: "Торговые площадки",
});

const { getMarketplaces } = useCrudMarketplacesResponse();

onMounted(async () => {
  await getMarketplaces();
});
</script>

<template>
  <div class="w-full h-full flex flex-col justify-between pb-[70px]">
    <SettingsMarketplacesTable />
  </div>
</template>

<style scoped></style>
