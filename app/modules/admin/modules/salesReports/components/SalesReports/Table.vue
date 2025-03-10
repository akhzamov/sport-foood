<script lang="ts" setup>
import { usePaymentStore } from "~/modules/admin/stores/payment";

const { openNewTab, openEditTab } = useTabs();
const paymentStore = usePaymentStore();
</script>

<template>
  <RequestsFilter v-if="paymentStore.filterShow" />
  <div class="w-full h-full">
    <div
      class="w-full flex-grow h-[40px] bg-dark-charcoal flex items-center justify-start gap-1"
    >
      <NuxtLink
        to="/admin-sales-reports"
        class="w-max h-[40px] relative flex flex-col justify-center px-2 text-14-semi text-gray-40 payment-requests-link"
      >
        <p class="flex items-center justify-center gap-2">
          <IconTrendUp />
          <span>Отчеты</span>
        </p>
      </NuxtLink>
      <NuxtLink
        to="/admin-sales-reports-archive"
        class="w-max h-[40px] relative flex flex-col justify-center px-2 text-14-semi text-gray-40 payment-requests-link"
      >
        <p class="flex items-center justify-center gap-2">
          <IconArchive />
          <span>Архив</span>
        </p>
      </NuxtLink>
    </div>
    <div
      class="w-full flex-grow h-[40px] bg-dark-gunmental p-2 flex items-center justify-between"
    >
      <div class="w-full h-full flex-grow flex items-center justify-start">
        <div class="w-auto h-full flex items-center justify-start">
          <div
            class="w-max h-[30px] px-3 flex items-center justify-center border-r border-gray-15 cursor-pointer"
          >
            <IconPlus class="w-[30px] h-[30px] text-gray-40" />
          </div>
        </div>
      </div>
    </div>
    <table class="w-full">
      <thead class="w-full">
        <tr
          class="w-full h-[32px] flex items-center text-12-med text-gray-40 border-b border-gray-40"
        >
          <th class="w-[72px] text-start pl-2">ID</th>
          <th
            class="min-w-[400px] flex-grow flex items-center justify-start pl-2"
          >
            <span>Магазин</span>
          </th>
          <th class="w-[200px] flex items-center justify-start pl-2">
            <span>Сумма</span>
          </th>
          <th class="w-[200px] flex items-center justify-start pl-2">
            <span>Дата отчета</span>
          </th>
        </tr>
      </thead>
      <tbody v-if="paymentStore.payments">
        <template v-for="(request, key) in paymentStore.payments" :key="key">
          <tr
            class="w-full h-[36px] flex items-center cursor-pointer hover:bg-gray-15 border-b border-gray-40"
          >
            <th
              class="w-[72px] flex items-center justify-start pl-2 text-14-reg text-gray-75"
            >
              {{ key }}
            </th>
            <th
              class="min-w-[178px] flex-grow flex items-center justify-start gap-1 pl-2 text-14-reg text-gray-75"
            >
              {{ request.store.name }}
            </th>
            <th
              class="w-[200px] flex items-center justify-start gap-1 pl-2 text-14-reg text-gray-75"
            >
              {{ Number(request.amount).toLocaleString("ru-RU") }}
              {{ request.currency }}
            </th>
            <th
              class="w-[200px] flex items-center justify-start pl-2 text-14-reg text-gray-75"
            >
              {{ request.created_at }}
            </th>
          </tr>
        </template>
      </tbody>
      <div v-else class="w-full h-[600px] flex items-center justify-center">
        <div class="loader"></div>
      </div>
    </table>
  </div>
</template>

<style scoped>
.payment-requests-link::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 2px;
  bottom: 0;
  left: 0;
  @apply bg-transparent;
}

.payment-requests-link::after.router-link-active {
  @apply bg-primary text-primary;
}

.router-link-active p {
  @apply text-primary;
}
</style>
