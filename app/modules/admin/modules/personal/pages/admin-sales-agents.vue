<script lang="ts" setup>
import { useAdminStore } from "~/modules/admin/stores/admin";
import { getSalesAgents } from "~/modules/admin/modules/personal/components/SalesAgents/salesAgents.data";

useSeoMeta({
  title: "Sport Food | Admin Sales Agents",
});

definePageMeta({
  middleware: "auth",
  layout: "admin",
  name: "Торговые Агенты",
});

const adminStore = useAdminStore();
const totalPages = computed(() => {
  if (adminStore.salesAgentsPagination) {
    return Math.ceil(
      adminStore.salesAgentsPagination.total /
        adminStore.salesAgentsPagination.per_page
    );
  } else {
    return 0;
  }
});
const changePage = (value: number) => {
  adminStore.salesAgentsPage = value;
  getSalesAgents();
};
</script>

<template>
  <div class="w-full h-full flex flex-col justify-between pb-[70px]">
    <SalesAgentsTable />
    <div
      class="h-[90px] py-[12px] px-[24px] border-t border-gray-15-color"
      v-if="
        adminStore.salesAgentsPagination &&
        adminStore.salesAgentsPagination.total > adminStore.salesAgentsPerPage
      "
    >
      <UiAdminPagination
        :total-pages="totalPages"
        :current-page="adminStore.salesAgentsPage"
        v-model:model-value="adminStore.salesAgentsPage"
        @update:model-value="changePage"
      />
    </div>
  </div>
</template>

<style scoped></style>
