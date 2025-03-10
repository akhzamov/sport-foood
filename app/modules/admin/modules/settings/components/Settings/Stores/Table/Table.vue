<script lang="ts" setup>
import { useLocalitiesStore } from "~/modules/admin/stores/localities";

const localitiesStore = useLocalitiesStore();
const { openEditTab } = useTabs();
</script>

<template>
  <div class="w-full h-full">
    <SettingsStoresTableTop />
    <table class="w-full">
      <thead class="w-full">
        <tr
          class="w-full h-[32px] flex items-center text-12-med text-gray-40 border-b border-gray-40"
        >
          <th class="w-[36px] text-center">№</th>
          <th
            class="min-w-[384px] flex-grow flex items-center justify-start gap-1"
          >
            <span>Название</span>
          </th>
          <th class="w-[100px] flex items-center justify-end mr-3">
            <span>Количество</span>
          </th>
          <th class="w-[110px] flex items-center justify-end mr-3">
            <span>Сумма</span>
          </th>
        </tr>
      </thead>
      <tbody v-if="localitiesStore.stores">
        <template v-for="store in localitiesStore.stores" :key="store.id">
          <tr
            @click="
              openEditTab(
                store.id,
                `settings-store-edit-${store.id}`,
                'Магазин'
              )
            "
            class="w-full h-[36px] flex items-center cursor-pointer hover:bg-gray-15 border-b border-gray-40"
          >
            <th
              class="w-[36px] flex items-center justify-center text-14-reg text-gray-75"
            >
              {{ store.id }}
            </th>
            <th
              class="min-w-[384px] flex-grow flex items-center justify-start gap-1 text-14-reg text-gray-75"
            >
              {{ store.name }}
            </th>
            <th
              class="w-[100px] flex items-center justify-end mr-3 gap-1 text-14-reg text-gray-75"
            >
              {{ Number(store.count.toFixed(1)).toLocaleString("ru-RU") }} гр
            </th>
            <th
              class="w-[110px] flex items-center justify-end mr-3 text-14-reg text-gray-75 gap-1"
            >
              {{ Number(store.amount.toFixed(1)).toLocaleString("ru-RU") }}
              <span class="text-10-ext text-primary uppercase"> rub </span>
            </th>
          </tr>
        </template>
      </tbody>
      <div
        v-if="!localitiesStore.stores"
        class="w-full h-[600px] flex items-center justify-center"
      >
        <div class="loader"></div>
      </div>
      <div
        v-if="localitiesStore.stores?.length == 0"
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
