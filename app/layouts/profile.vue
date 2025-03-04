<script lang="ts" setup>
import {
  getSalesPlan,
  getStores,
} from "~/modules/profile/components/Header/profileHeader.data";
import { useProfileStore } from "~/modules/profile/stores/profile";
import {
  getAreas,
  getStorageTypes,
} from "~/modules/profile/components/Warehouse/warehouse.data";
import { getStoragesLeft } from "~/modules/profile/components/Warehouse/Warehouse/warehouseBalance.data";
import { useMainStore } from "~/stores/main";
import {
  getIndexMarketplaces,
  getIndexAgents,
  getIndexStorages,
} from "~/modules/profile/components/Dashboard/Balance/balance.data";
import { getPurchases } from "~/modules/profile/components/Dashboard/Purchases/purchases.data";
import { getMarketplacesData } from "~/modules/profile/components/Dashboard/Rating/MarketplacesData";
import { getSpending } from "~/modules/profile/components/Dashboard/Expenses/expenses.data";

const profileStore = useProfileStore();
const mainStore = useMainStore();
const { $loginRep } = useNuxtApp();

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
  const resUser = await $loginRep.getUser();
  mainStore.user = resUser;
  await getStores();
  await getSalesPlan();
  await getMarketplacesData();
  await getSpending();
  await getIndexMarketplaces();
  await getIndexAgents();
  await getIndexStorages();
  await getPurchases();
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
