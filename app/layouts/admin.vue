<script lang="ts" setup>
import { useAdminStore } from "~/modules/admin/stores/admin";
import { useMainStore } from "~/stores/main";
import { getStores } from "~/modules/profile/components/Header/profileHeader.data";

const adminStore = useAdminStore();
const mainStore = useMainStore();
const { $loginRep } = useNuxtApp();
const { getAreas, getCitiesByArea } = useCrudCitiesResponse();

onMounted(async () => {
  const resUser = await $loginRep.getUser();
  mainStore.user = resUser;
  await getStores();
  await getAreas();
  await getCitiesByArea();
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
    <UiRightAlert
      v-if="mainStore.rightAlertShow"
      :type="mainStore.rightAlertShowType"
      :text="mainStore.rightAlertShowText"
    />
    <UiConfirmAlert
      v-if="mainStore.confirmAlertShow"
      :type="mainStore.confirmAlertShowType"
      :title="mainStore.confirmAlertShowTitle"
      :text="mainStore.confirmAlertShowText"
    />
  </TransitionGroup>
  <div class="w-full h-screen overflow-x-hidden overflow-y-hidden">
    <AdminAppHeader />
    <div class="w-full h-full flex">
      <AdminAside />
      <div class="relative w-full h-full flex bg-dark-charcoal">
        <div class="w-full h-auto flex-grow z-[0]">
          <NuxtPage />
        </div>
        <AdminRightTabs v-if="adminStore.activeOpenTabs.length > 0" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
