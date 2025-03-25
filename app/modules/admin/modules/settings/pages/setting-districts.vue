<script lang="ts" setup>
import { useAdminStore } from "~/modules/admin/stores/admin";

useSeoMeta({
  title: "Sport Food | Setting Districts",
});

definePageMeta({
  middleware: "auth",
  layout: "admin",
  name: "Районы",
});

const adminStore = useAdminStore();
const { getDistricts } = useCrudDistrictsResponse();
const changePage = (page: number) => {
  adminStore.districtsPage = page;
  getDistricts();
};
const totalPages = computed(() => {
  if (adminStore.districtsPagination) {
    return Math.ceil(
      adminStore.districtsPagination.total /
        adminStore.districtsPagination.per_page
    );
  } else {
    return 0;
  }
});

onMounted(async () => {
  await getDistricts();
});
</script>

<template>
  <div class="w-full h-full flex flex-col justify-between pb-[70px]">
    <SettingsDistrictsTable />
    <div
      class="h-[90px] py-[12px] px-[24px] border-t border-gray-15"
      v-if="
        adminStore.districtsPagination &&
        adminStore.districtsPagination.total > adminStore.perPage
      "
    >
      <UiAdminPagination
        :total-pages="totalPages"
        :current-page="adminStore.districtsPage"
        v-model:model-value="adminStore.districtsPage"
        @update:model-value="changePage($event)"
      />
    </div>
  </div>
</template>

<style scoped></style>
