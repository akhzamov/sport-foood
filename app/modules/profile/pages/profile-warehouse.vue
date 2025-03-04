<script lang="ts" setup>
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
