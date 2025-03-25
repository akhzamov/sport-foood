<script lang="ts" setup>
import { useAdminStore } from "~/modules/admin/stores/admin";

useSeoMeta({
  title: "Sport Food | Setting Cities",
});

definePageMeta({
  middleware: "auth",
  layout: "admin",
  name: "Города",
});

const adminStore = useAdminStore();
const { getCities } = useCrudCitiesResponse();
const changePage = async (page: number) => {
  const currentTab = adminStore.activeOpenTab; // Сохраняем текущую активную вкладку
  adminStore.citiesPage = page;
  await getCities();
  adminStore.activeOpenTab = currentTab;
};
const totalPages = computed(() => {
  if (adminStore.citiesPagination) {
    return Math.ceil(
      adminStore.citiesPagination.total / adminStore.citiesPagination.per_page
    );
  } else {
    return 0;
  }
});

onMounted(async () => {
  await getCities();
});
</script>

<template>
  <div class="w-full h-full flex flex-col justify-between pb-[70px]">
    <SettingsCitiesTable />
    <div
      class="h-[90px] py-[12px] px-[24px] border-t border-gray-15"
      v-if="
        adminStore.citiesPagination &&
        adminStore.citiesPagination.total > adminStore.perPage
      "
    >
      <UiAdminPagination
        :total-pages="totalPages"
        :current-page="adminStore.citiesPage"
        v-model:model-value="adminStore.citiesPage"
        @update:model-value="changePage($event)"
      />
    </div>
  </div>
</template>

<style scoped></style>
