<script lang="ts" setup>
import { useAdminStore } from "~/modules/admin/stores/admin";

const { getCities } = useCrudCitiesResponse();
const { openNewTab } = useTabs();
const route = useRoute();
const adminStore = useAdminStore();
const selectAreaMenu = ref(false);

const selectArea = (region: number) => {
  adminStore.selectedArea = region;
  getCities();
};

const debouncedGetCities = useDebounceFn(() => {
  getCities();
}, 500);

watch(
  () => adminStore.searchCities,
  () => {
    debouncedGetCities();
  },
  { deep: true }
);
</script>

<template>
  <div
    class="w-full flex-grow h-[40px] bg-dark-gunmental px-2 p-2 flex items-center justify-between"
  >
    <div class="w-full h-full flex-grow flex items-center justify-start">
      <div class="w-auto h-full flex items-center justify-start">
        <div
          class="min-w-[170px] h-full flex items-center justify-start px-3 py-1 border-r border-gray-15"
        >
          <p class="text-16-400 text-gray-40">{{ route.name }}</p>
        </div>
        <IconPlus
          class="text-gray-40 hover:text-primary ml-4"
          @click="openNewTab('settings-city-add', 'Город')"
        />
      </div>
    </div>
    <div class="w-full flex-grow h-full flex items-center justify-end gap-5">
      <div class="w-auto h-full flex items-center gap-3 pl-3">
        <UiSelect
          v-if="adminStore.areas"
          main-text-color="text-gray-90"
          select-bg-color="bg-gray-15"
          disable-text-color="text-gray-40"
          disable-bg-color="bg-gray-15"
          :array="adminStore.areas || []"
          :show-menu="selectAreaMenu"
          default-select-text="Все области"
          v-model:model-value="adminStore.selectedArea"
          :icon="false"
          value-key="id"
          label-key="name"
          @update:show-menu="selectAreaMenu = $event"
          @update:model-value="selectArea($event)"
          width="min-w-[240px]"
          :text-center="false"
          :disable="false"
          class="h-[32px] z-[100]"
          @click.stop
        />
      </div>
      <div
        class="w-[240px] max-h-[32px] flex items-center justify-center pr-2 bg-gray-15 border border-gray-90 rounded-lg text-gray-90"
      >
        <UiInputIcon
          v-model:model-value="adminStore.searchCities"
          placeholder="Поиск города"
          type="text"
          class="max-w-[240px] px-2"
        />
        <IconSearchMd />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
