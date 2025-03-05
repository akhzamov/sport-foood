<script lang="ts" setup>
import { useAdminStore } from "~/modules/admin/stores/admin";
import { usePaymentStore } from "~/modules/admin/stores/payment";
import { useMainStore } from "~/stores/main";

const adminStore = useAdminStore();
const mainStore = useMainStore();
const paymentStore = usePaymentStore();
const openNewTab = (id: string) => {
  const exists = adminStore.activeOpenTabs.some((item) => item.id === id);

  if (exists) {
    mainStore.alertShow = true;
    mainStore.alertShowType = "error";
    mainStore.alertShowTitle = "Ошибка";
    mainStore.alertShowText =
      "Нельзя открыть несколько одинаковых окон! Закройте или сохраните предыдущее окно";
  } else {
    adminStore.activeOpenTabs.push({
      id,
      title: "Новая",
      name: "Заявка",
    });
  }
};
const openEditTab = (id: number, textId: string) => {
  const exists = adminStore.activeOpenTabs.some((item) => item.id === textId);
  adminStore.openUser = id;

  if (exists) {
    adminStore.activeOpenTab = textId;
  } else {
    adminStore.activeOpenTabs.push({
      id: textId,
      title: `#${id}`,
      name: "Заявка",
    });
  }
};
</script>

<template>
  <RequestsFilter v-if="paymentStore.filterShow" />
  <div class="w-full h-full">
    <div
      class="w-full flex-grow h-[40px] bg-dark-charcoal flex items-center justify-start gap-1"
    >
      <NuxtLink
        to="/payment-requests"
        class="w-max h-[40px] relative flex flex-col justify-center px-2 text-14-semi text-gray-40 payment-requests-link"
      >
        <p class="flex items-center justify-center gap-2">
          <IconRefreshCw05 />
          <span>Заявки</span>
        </p>
      </NuxtLink>
      <NuxtLink
        to="/payment-archive"
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
            @click="openNewTab('payment-requests-add')"
            class="w-max h-[30px] px-3 flex items-center justify-center border-r border-gray-15 cursor-pointer"
          >
            <IconPlus class="w-[30px] h-[30px] text-gray-40" />
          </div>
          <div
            class="w-max h-[30px] px-3 flex items-center justify-center border-r border-gray-15 cursor-pointer"
          >
            <IconSettings class="w-[30px] h-[30px] text-gray-40" />
          </div>
          <div
            @click="paymentStore.filterShow = true"
            class="w-max h-[30px] px-3 flex items-center justify-center border-r border-gray-15 cursor-pointer"
          >
            <IconFilters class="w-[30px] h-[30px] text-gray-40" />
          </div>
        </div>
      </div>
    </div>
    <table class="w-full">
      <thead class="w-full">
        <tr
          class="w-full h-[32px] flex items-center text-12-med text-gray-40 border-b border-gray-40"
        >
          <th class="w-[72px] text-start pl-2">ID заявки</th>
          <th class="w-[182px] flex items-center justify-start pl-2">
            <span>Магазин</span>
          </th>
          <th
            class="min-w-[178px] flex-grow flex items-center justify-start pl-2"
          >
            <span>Тип заявки</span>
          </th>
          <th class="w-[148px] flex items-center justify-start pl-2">
            <span>Город</span>
          </th>
          <th class="w-[160px] flex items-center justify-start pl-2">
            <span>Получатель</span>
          </th>
          <th class="w-[160px] flex items-center justify-end pr-2">
            <span>Сумма</span>
          </th>
          <th class="w-[106px] flex items-center justify-center">
            <span>Дата заявки</span>
          </th>
          <th class="w-[140px] flex items-center justify-start pl-3">
            <span>Статус заявки</span>
          </th>
          <th class="w-[96px] flex items-center justify-start pl-3">
            <span>Приоритет</span>
          </th>
        </tr>
      </thead>
      <tbody v-if="paymentStore.payments">
        <template v-for="(request, key) in paymentStore.payments" :key="key">
          <tr
            @click="openEditTab(key, `payment-requests-edit-${key}`)"
            class="w-full h-[36px] flex items-center cursor-pointer hover:bg-gray-15 border-b border-gray-40"
          >
            <th
              class="w-[72px] flex items-center justify-start pl-2 text-14-reg text-gray-75"
            >
              {{ key }}
            </th>
            <th
              class="w-[182px] flex items-center justify-start gap-1 pl-2 text-14-reg text-gray-75"
            >
              {{ request.store.name }}
            </th>
            <th
              class="min-w-[178px] flex-grow flex items-center justify-start gap-1 pl-2 text-14-reg text-gray-75"
            >
              {{ request.type }}
            </th>
            <th
              class="w-[148px] flex items-center justify-start pl-2 text-14-reg text-gray-75"
            >
              {{ request.city.name ?? "Не выбран" }}
            </th>
            <th
              class="w-[160px] flex items-center justify-start pl-2 text-14-reg text-gray-75"
            >
              {{ request.receiver ?? "Не задан" }}
            </th>
            <th class="w-[160px] flex items-center justify-end gap-1 pr-2">
              <span class="text-14-reg text-gray-75">
                {{ Number(request.amount).toLocaleString("ru-RU") }}
              </span>
              <span
                class="text-10-ext"
                :class="[
                  request.currency == 'usd' ? 'text-mint' : 'text-primary',
                ]"
              >
                {{ request.currency.toUpperCase() }}
              </span>
            </th>
            <th
              class="w-[106px] flex items-center justify-center text-14-reg text-gray-75"
            >
              {{ request.created_at }}
            </th>
            <th
              class="w-[140px] flex items-center justify-start pl-3 text-14-reg text-gray-75"
            >
              <span
                v-if="request.status == 'Оплачено'"
                class="w-max h-[22px] flex items-center px-2 rounded-[20px] text-12-reg bg-green-500/15 text-green-500"
              >
                {{ request.status }}
              </span>
              <span
                v-if="request.status == 'Ожидает оплаты'"
                class="w-max h-[22px] flex items-center px-2 rounded-[20px] text-12-reg bg-white/15 text-white"
              >
                {{ request.status }}
              </span>
              <span
                v-if="request.status == 'Отменен'"
                class="w-max h-[22px] flex items-center px-2 rounded-[20px] text-12-reg bg-red-500/15 text-red-500"
              >
                {{ request.status }}
              </span>
            </th>
            <th
              class="w-[96px] flex items-center justify-start pl-3 text-14-reg text-gray-75"
            >
              <span
                v-if="request.priority == 'Средний'"
                class="w-max h-[22px] rounded-[20px] flex items-center px-2 text-12-reg border border-yellow-500 text-yellow-500"
              >
                {{ request.priority }}
              </span>
              <span
                v-if="request.priority == 'Обычный'"
                class="w-max h-[22px] rounded-[20px] flex items-center px-2 text-12-reg border border-white text-white"
              >
                {{ request.priority }}
              </span>
              <span
                v-if="request.priority == 'Срочный'"
                class="w-max h-[22px] rounded-[20px] flex items-center px-2 text-12-reg border border-red-500 text-red-500"
              >
                {{ request.priority }}
              </span>
              <span
                v-if="request.priority == null"
                class="w-max h-[22px] rounded-[20px] flex items-center px-2 text-12-reg border border-violet-500 text-violet-500"
              >
                Не задан
              </span>
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
