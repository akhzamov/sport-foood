<script lang="ts" setup>
import { useLogisticStore } from "~/modules/admin/stores/logistic";

const { openEditTab } = useTabs();
const logisticStore = useLogisticStore();
</script>

<template>
  <div class="w-full h-full">
    <LogisticsTableTop />
    <table class="w-full">
      <thead class="w-full">
        <tr
          class="w-full h-[32px] flex items-center text-12-med text-gray-40 border-b border-gray-40"
        >
          <th class="w-[72px] text-center">ID заказа</th>
          <th class="w-[180px] text-left pl-3">Поставщик</th>
          <th class="w-[180px] text-left pl-3">Водитель</th>
          <th class="w-[140px] text-left pl-3">Дата выезда</th>
          <th class="w-[320px] flex-grow text-left pl-3">Точки доставки</th>
          <th class="max-w-[400px] w-full text-left pl-3">Статус</th>
        </tr>
      </thead>
      <tbody v-if="logisticStore.shipments">
        <template v-for="(item, index) in logisticStore.shipments">
          <tr
            @click="openEditTab(+item.id, `logistics-edit-view-${item.id}`, 'Закуп')"
            :class="[
              index - 1 !== Object.values(logisticStore.shipments).length
                ? 'border-b border-gray-40'
                : '',
            ]"
            class="w-full h-[36px] flex items-center cursor-pointer hover:bg-gray-15"
          >
            <th class="w-[72px] flex justify-center">
              <span class="text-center text-12-reg text-gray-75">
                {{ item.id }}
              </span>
            </th>
            <th class="w-[180px] flex items-center justify-start">
              <span class="pl-3 text-14-reg text-gray-75">
                {{ item.supplier_name }}
              </span>
            </th>
            <th class="w-[180px] flex items-center justify-start">
              <span class="pl-3 text-14-reg text-gray-75">
                {{ item.driver_name }}
              </span>
            </th>
            <th class="w-[140px] flex items-center justify-start">
              <span class="pl-3 text-14-reg text-gray-75">
                {{ item.start_date }}
              </span>
              <!-- <span class="ml-1 text-12-reg text-gray-40">
                {{ timeFormatter(item.start_date) }}
              </span> -->
            </th>
            <th class="w-[320px] flex-grow flex items-center justify-start">
              <template v-for="city in item.cities">
                <div
                  class="ml-3 w-[6px] h-[6px] block rounded-[50%] bg-gray-75"
                ></div>
                <span class="ml-1 text-14-reg text-gray-75">
                  {{ city.name }}
                </span>
              </template>
            </th>
            <th class="max-w-[400px] w-full flex items-center justify-start">
              <p
                v-if="item.status == 'Доставлен'"
                class="ml-3 px-2 w-max h-[22px] rounded-[20px] bg-emerald-500/15 flex items-center justify-start gap-1"
              >
                <IconCheck class="w-[12px] h-[12px] text-emerald-500" />
                <span class="text-12-reg text-emerald-500">
                  {{ item.status }}
                </span>
              </p>
              <p
                v-if="item.status == 'В пути'"
                class="ml-3 px-2 w-max h-[22px] rounded-[20px] bg-yellow-500/15 flex items-center justify-start gap-1"
              >
                <IconTruck02 class="w-[12px] h-[12px] text-yellow-500" />
                <span class="text-12-reg text-yellow-500">
                  {{ item.status }}
                </span>
              </p>
              <p
                v-if="item.status == 'Не полностью'"
                class="ml-3 px-2 w-max h-[22px] rounded-[20px] bg-error-500/20 flex items-center justify-start gap-1"
              >
                <IconAlertTriangle class="w-[12px] h-[12px] text-error-500" />
                <span class="text-12-reg text-error-500">
                  Доставлен не полностью
                </span>
              </p>
            </th>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<style scoped></style>
