<script lang="ts" setup>
import { useAdminLogisticsStore } from '~/modules/admin/modules/logistics/stores/adminLogistics';

const adminLogisticsStore = useAdminLogisticsStore();
</script>

<template>
  <div class="w-full h-screen overflow-x-hidden overflow-y-hidden">
    <AdminAppHeader />
    <div class="w-full h-full flex">
      <AdminAside />
      <div class="w-full h-full flex bg-dark-charcoal-color">
        <div class="flex-grow">
          <NuxtPage />
        </div>
        <AdminRightTabs v-if="adminLogisticsStore.activeOpenTabs.length > 0"/>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
