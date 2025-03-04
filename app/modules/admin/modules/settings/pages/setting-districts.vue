<script lang="ts" setup>
import { useLocalitiesStore } from "~/modules/admin/stores/localities";

useSeoMeta({
  title: "Sport Food | Setting Districts",
});

definePageMeta({
  middleware: "auth",
  layout: "admin",
  name: "Районы",
});

const localitiesStore = useLocalitiesStore();
const { getDistricts } = useCrudDistrictsResponse();
const changePage = (page: number) => {
  localitiesStore.districtsPage = page;
  getDistricts();
};
const totalPages = computed(() => {
  if (localitiesStore.districtsPagination) {
    return Math.ceil(
      localitiesStore.districtsPagination.total /
        localitiesStore.districtsPagination.per_page
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
        localitiesStore.districtsPagination &&
        localitiesStore.districtsPagination.total > localitiesStore.perPage
      "
    >
      <UiAdminPagination
        :total-pages="totalPages"
        :current-page="localitiesStore.districtsPage"
        v-model:model-value="localitiesStore.districtsPage"
        @update:model-value="changePage($event)"
      />
    </div>
  </div>
</template>

<style scoped></style>
