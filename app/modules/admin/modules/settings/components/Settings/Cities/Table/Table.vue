<script lang="ts" setup>
import { useAdminStore } from "~/modules/admin/stores/admin";

const { openEditTab } = useTabs();
const adminStore = useAdminStore();
</script>

<template>
  <div class="w-full h-full">
    <SettingsCitiesTableTop />
    <table class="w-full">
      <thead class="w-full">
        <tr
          class="w-full h-[32px] flex items-center text-12-med text-gray-40 border-b border-gray-40"
        >
          <th class="w-[36px] text-center">№</th>
          <th class="w-[384px] flex items-center justify-start gap-1">
            <span>Город</span>
          </th>
          <th class="w-[385px] flex items-center justify-start gap-1">
            <span>Область</span>
          </th>
          <th class="min-w-[385px] flex-grow flex items-center justify-start">
            <span>Страна</span>
          </th>
        </tr>
      </thead>
      <tbody v-if="adminStore.cities">
        <template v-for="city in adminStore.cities" :key="city.id">
          <tr
            @click="
              openEditTab(city.id, `settings-city-edit-${city.id}`, 'Город')
            "
            class="w-full h-[36px] flex items-center cursor-pointer hover:bg-gray-15 border-b border-gray-40"
          >
            <th
              class="w-[36px] flex items-center justify-center text-14-reg text-gray-75"
            >
              {{ city.id }}
            </th>
            <th
              class="w-[384px] flex items-center justify-start gap-1 text-14-reg text-gray-75"
            >
              {{ city.name }}
            </th>
            <th
              class="w-[385px] flex items-center justify-start gap-1 text-14-reg text-gray-75"
            >
              {{ city.area.name }}
            </th>
            <th
              class="min-w-[395px] flex-grow flex items-center justify-start text-14-reg text-gray-75"
            >
              {{ city.country.name }}
            </th>
          </tr>
        </template>
      </tbody>
      <div
        v-if="!adminStore.cities"
        class="w-full h-[600px] flex items-center justify-center"
      >
        <div class="loader"></div>
      </div>
      <div
        v-if="adminStore.cities?.length == 0"
        class="w-full h-[600px] flex items-center justify-center"
      >
        <span class="text-16-med text-gray-75">
          Нет данных для отображение
        </span>
      </div>
    </table>
  </div>
</template>

<style scoped></style>
