<script lang="ts" setup>
import { getStores } from "../components/Header/profileHeader.data";
import {
  getAreas,
  getStorageTypes,
} from "../components/Warehouse/warehouse.data";
import { getStoragesLeft } from "../components/Warehouse/Warehouse/warehouseBalance.data";

useSeoMeta({
  title: "Sport Food | Profile Report",
});

definePageMeta({
  middleware: "auth",
  layout: "profile",
});

onMounted(async () => {
  await getStores();
  await getAreas();
  await getStorageTypes();
  await getStoragesLeft();
});
</script>

<template>
  <div class="container-custom">
    <Warehouse />
  </div>
</template>

<style scoped></style>
