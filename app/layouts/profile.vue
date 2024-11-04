<script lang="ts" setup>
import { getStores } from "~/modules/profile/components/Header/profileHeader.data";
import { useProfileStore } from "~/modules/profile/stores/profile";
import {
  getAreas,
  getStorageTypes,
} from "~/modules/profile/components/Warehouse/warehouse.data";
import { getStoragesLeft } from "~/modules/profile/components/Warehouse/Warehouse/warehouseBalance.data";

const profileStore = useProfileStore();

watch(
  () => profileStore.reportGraphAddSettingModal,
  () => {
    if (profileStore.reportGraphAddSettingModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }
);

onMounted(async () => {
  await getStores();
  await getAreas();
  await getStorageTypes();
  await getStoragesLeft();
});
</script>

<template>
  <ProfileAppHeader />
  <HeaderProfileHeader />
  <ReportReportGraphAddSettingModule
    v-if="profileStore.reportGraphAddSettingModal"
  />
  <NuxtPage />
</template>

<style scoped></style>
