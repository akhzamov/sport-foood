<script lang="ts" setup>
import { useAdminStore } from "~/modules/admin/stores/admin";
import { getSalesAgents } from "~/modules/admin/modules/personal/components/SalesAgents/salesAgents.data";
import { usePersonalStore } from "~/modules/admin/stores/personal";

useSeoMeta({
  title: "Sport Food | Admin Sales Agents",
});

definePageMeta({
  middleware: "auth",
  layout: "admin",
  name: "Торговые Агенты",
});

const personalStore = usePersonalStore();
const totalPages = computed(() => {
  if (personalStore.salesAgentsPagination) {
    return Math.ceil(
      personalStore.salesAgentsPagination.total /
        personalStore.salesAgentsPagination.per_page
    );
  } else {
    return 0;
  }
});
const changePage = (value: number) => {
  personalStore.salesAgentsPage = value;
  getSalesAgents();
};
</script>

<template>
  <div class="w-full h-full flex flex-col justify-between pb-[70px]">
    <SalesAgentsTable />
    <div
      class="h-[90px] py-[12px] px-[24px] border-t border-gray-15-color"
      v-if="
        personalStore.salesAgentsPagination &&
        personalStore.salesAgentsPagination.total >
          personalStore.salesAgentsPerPage
      "
    >
      <UiAdminPagination
        :total-pages="totalPages"
        :current-page="personalStore.salesAgentsPage"
        v-model:model-value="personalStore.salesAgentsPage"
        @update:model-value="changePage"
      />
    </div>
  </div>
</template>

<style scoped></style>
