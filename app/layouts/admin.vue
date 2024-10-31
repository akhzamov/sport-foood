<script lang="ts" setup>
import { useAdminLogisticsStore } from "~/modules/admin/modules/logistics/stores/adminLogistics";
import { useMainStore } from "~/stores/main";

const adminLogisticsStore = useAdminLogisticsStore();
const mainStore = useMainStore();
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
      type="error"
      :title="mainStore.alertShowTitle"
      :text="mainStore.alertShowText"
    />
  </TransitionGroup>
  <div class="w-full h-screen overflow-x-hidden overflow-y-hidden">
    <AdminAppHeader />
    <div class="w-full h-full flex">
      <AdminAside />
      <div class="w-full h-full flex bg-dark-charcoal-color">
        <div class="flex-grow">
          <NuxtPage />
        </div>
        <AdminRightTabs v-if="adminLogisticsStore.activeOpenTabs.length > 0" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
