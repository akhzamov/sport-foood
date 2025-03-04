<script lang="ts" setup>
import { useLocalitiesStore } from "~/modules/admin/stores/localities";

useSeoMeta({
  title: "Sport Food | Setting Cities",
});

definePageMeta({
  middleware: "auth",
  layout: "admin",
  name: "Города",
});

const localitiesStore = useLocalitiesStore();
const { getCities } = useCrudCitiesResponse();
const changePage = (page: number) => {
  localitiesStore.citiesPage = page;
  getCities();
};
const totalPages = computed(() => {
  if (localitiesStore.citiesPagination) {
    return Math.ceil(
      localitiesStore.citiesPagination.total /
        localitiesStore.citiesPagination.per_page
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
        localitiesStore.citiesPagination &&
        localitiesStore.citiesPagination.total > localitiesStore.perPage
      "
    >
      <UiAdminPagination
        :total-pages="totalPages"
        :current-page="localitiesStore.citiesPage"
        v-model:model-value="localitiesStore.citiesPage"
        @update:model-value="changePage($event)"
      />
    </div>
  </div>
</template>

<style scoped></style>
