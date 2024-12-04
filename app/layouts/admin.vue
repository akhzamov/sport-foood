<script lang="ts" setup>
import { useAdminLogisticsStore } from "~/modules/admin/modules/logistics/stores/adminLogistics";
import { getPermissions } from "~/modules/admin/modules/personal/components/Roles/roles.data";
import { useAdminStore } from "~/modules/admin/stores/admin";
import { useMainStore } from "~/stores/main";
import { getUsers } from "~/modules/admin/modules/personal/components/Employees/employees.data";
import { getSalesAgents } from "~/modules/admin/modules/personal/components/SalesAgents/salesAgents.data";
import { getStores } from "~/modules/profile/components/Header/profileHeader.data";

const adminLogisticsStore = useAdminLogisticsStore();
const adminStore = useAdminStore();
const mainStore = useMainStore();
const { $loginRep } = useNuxtApp();

onMounted(async () => {
  const resUser = await $loginRep.getUser();
  mainStore.user = resUser;
  await getStores();
  await getPermissions();
  await getUsers();
  await getSalesAgents();
});
</script>

<template>
  <TransitionGroup name="alert">
    <UiConfirmModal
      v-if="mainStore.confirmModal"
      type="delete"
      :title="mainStore.confirmModalTitle"
      :text="mainStore.confirmModalText"
    />
    <UiAlert
      v-if="mainStore.alertShow"
      :type="mainStore.alertShowType"
      :title="mainStore.alertShowTitle"
      :text="mainStore.alertShowText"
    />
  </TransitionGroup>
  <div class="w-full h-screen overflow-x-hidden overflow-y-hidden">
    <AdminAppHeader />
    <div class="w-full h-full flex">
      <AdminAside />
      <div class="relative w-full h-full flex bg-dark-charcoal-color">
        <div class="w-full h-auto flex-grow z-[0]">
          <NuxtPage />
        </div>
        <AdminRightTabs v-if="adminStore.activeOpenTabs.length > 0" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
