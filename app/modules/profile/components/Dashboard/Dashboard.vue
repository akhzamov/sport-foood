<script lang="ts" setup>
import { useProfileStore } from "~/modules/profile/stores/profile";
import { getSalesPlan } from "~/modules/profile/components/Header/profileHeader.data";
import { getMarketplacesData } from "~/modules/profile/components/Dashboard/Rating/MarketplacesData";
import { getSpending } from "./Expenses/expenses.data";

const profileStore = useProfileStore();
const activeMoreInfo = computed(() => profileStore.activeMoreInfo);
const activeDayFilterBlocked = computed(
  () => profileStore.activeDayFilterBlocked
);
const salesPlan = computed(() => profileStore.salesPlan);
const indexMarketplacesLeft = computed(
  () => profileStore.indexMarketplacesLeft
);
const marketplacesData = computed(() => profileStore.marketplacesData);
const isChartReady = ref(false);
const datepicker = ref<any>(null);
const date = ref<Date[]>();

function formatDate(date: Date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
}

function getDateRange(days: number | string) {
  const today = new Date(); // Текущая дата
  const dateTo = new Date(today); // Конец периода (сегодняшняя дата)
  const dateFrom = new Date(today); // Начало периода

  if (days === "месяц") {
    // Устанавливаем начало месяца
    dateFrom.setDate(1);
  } else if (typeof days === "number") {
    // Если это число (например, 30, 14, 7, 1)
    dateFrom.setDate(today.getDate() - days + 1);
  }

  return {
    date_from: formatDate(dateFrom),
    date_to: formatDate(dateTo),
  };
}

function selectDate(value: boolean) {
  if (value) {
    datepicker.value?.openMenu();
  } else {
    datepicker.value?.clearValue();
  }
}

const daysFilter = reactive([
  { id: 1, title: "Месяц", value: 0, ...getDateRange("месяц") },
  { id: 2, title: "30 д", value: 30, ...getDateRange(30) },
  { id: 3, title: "14 д", value: 14, ...getDateRange(14) },
  { id: 4, title: "7 д", value: 7, ...getDateRange(7) },
  { id: 5, title: "24 ч", value: 1, ...getDateRange(1) },
]);

const activeTab = async (value: number) => {
  profileStore.activeMoreInfo = false;
  if (!profileStore.activeDayFilterBlocked) {
    const activeItem = daysFilter.find((item) => item.value === value);

    if (activeItem) {
      profileStore.activeDayFilterBlocked = true;
      profileStore.activeDayFilter = activeItem.value;
      profileStore.activeDayFilterValue = {
        date_from: activeItem.date_from,
        date_to: activeItem.date_to,
      };
      await getSalesPlan();
      await getMarketplacesData();
      await getSpending();
      profileStore.activeDayFilterBlocked = false;
    }
  }
};

const moreInfo = ref<HTMLElement | null>(null);

const scrollTo = () => {
  if (moreInfo.value) {
    moreInfo.value.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }
};

watch(
  activeMoreInfo,
  (newValue) => {
    if (newValue) {
      setTimeout(() => {
        scrollTo();
      }, 500);
    }
  },
  { immediate: true }
);

watch(salesPlan, async (newSalesPlan) => {
  if (newSalesPlan) {
    activeTab(2);
    await nextTick();
    isChartReady.value = true;
  } else {
    isChartReady.value = false;
  }
});

watch(date, async (newDate) => {
  if (
    newDate &&
    newDate[0] &&
    newDate[1] &&
    profileStore.activeDayFilterValue
  ) {
    profileStore.activeDayFilterValue.date_from = formatDate(newDate[0]);
    profileStore.activeDayFilterValue.date_to = formatDate(newDate[1]);
    profileStore.activeDayFilter = 3;
    getSalesPlan();
    getMarketplacesData();
    getSpending();
  }
});
</script>

<template>
  <div class="flex items-center justify-between pt-12">
    <h2 class="text-32-semi text-gray-90-color">Анализ</h2>
    <div class="h-full flex items-center justify-end gap-3">
      <div class="h-full flex flex-col">
        <div
          class="w-max h-[38px] flex items-center justify-center gap-2 rounded-md py-1 px-2 cursor-pointer"
          :class="{
            'bg-dark-onix-color': !activeDayFilterBlocked,
            'bg-gray-15-color': activeDayFilterBlocked,
            'bg-primary-color text-dark-night-color-color':
              profileStore.activeDayFilter == 3 && !activeDayFilterBlocked,
            'text-gray-90-color': profileStore.activeDayFilter !== 3,
          }"
          @click="selectDate(true)"
        >
          <IconCalendar />
          <span class="text-14-reg">{{
            date && date[0] && date[1]
              ? `${formatDate(date[0])} - ${formatDate(date[1])}`
              : "Выбрать период"
          }}</span>
        </div>
        <DatePicker
          v-model="date"
          ref="datepicker"
          cancelText="Отмена"
          selectText="Сохранить"
          locale="ru"
          :dark="true"
          range
        />
      </div>
      <div
        class="flex items-center justify-center gap-2 rounded-md p-1"
        :class="{
          'bg-dark-onix-color': !activeDayFilterBlocked,
          'bg-gray-15-color': activeDayFilterBlocked,
        }"
      >
        <div
          v-for="day in daysFilter"
          :key="day.id"
          class="w-20 h-[30px] flex items-center justify-center rounded-[4px]"
          :class="{
            'bg-primary-color':
              profileStore.activeDayFilter == day.value &&
              !activeDayFilterBlocked,
            'bg-gray-40-color':
              profileStore.activeDayFilter == day.value &&
              activeDayFilterBlocked,
            'cursor-pointer': !activeDayFilterBlocked,
            'cursor-not-allowed': activeDayFilterBlocked,
            'bg-transparent': profileStore.activeDayFilter != day.value,
          }"
          @click="activeTab(day.value)"
        >
          <span
            class="text-14-med"
            :class="{
              'text-dark-night-color':
                profileStore.activeDayFilter == day.value &&
                !activeDayFilterBlocked,
              'text-gray-90-color':
                profileStore.activeDayFilter != day.value &&
                !activeDayFilterBlocked,
              'text-dark-charcoal-color':
                profileStore.activeDayFilter == day.value &&
                activeDayFilterBlocked,
              'text-gray-40-color':
                profileStore.activeDayFilter != day.value &&
                activeDayFilterBlocked,
            }"
            >{{ day.title }}</span
          >
        </div>
      </div>
    </div>
  </div>

  <div class="w-full grid grid-cols-custom-3-390 gap-6 justify-center mt-4">
    <div class="grid col-span-1">
      <DashboardChartLoadChart v-if="!salesPlan" />
      <DashboardChartBarLine v-if="salesPlan" />
    </div>
    <div class="grid col-span-1">
      <DashboardBalance />
    </div>
    <div class="grid col-span-1">
      <DashboardChartLoadChart v-if="!profileStore.purchases" />
      <DashboardPurchases v-if="profileStore.purchases" />
    </div>
    <div class="grid col-span-1">
      <DashboardChartLoadChart v-if="!marketplacesData" />
      <DashboardRatingMarketplaces v-if="marketplacesData" />
    </div>
    <div class="grid col-span-1">
      <DashboardChartLoadChart v-if="!profileStore.spending" />
      <DashboardExpenses v-if="profileStore.spending" />
    </div>
  </div>

  <div class="w-full grid grid-cols-1 mt-4 pb-16" ref="moreInfo">
    <Transition name="salesRanking">
      <DashboardGraphSalesRanking
        v-if="
          profileStore.selectedDate.length > 0 && profileStore.activeMoreInfo
        "
      />
    </Transition>
  </div>
</template>

<style scoped>
.salesRanking-enter-active,
.salesRanking-leave-active {
  height: 400px;
  overflow: visible;
  transition: height 0.5s linear;
}

.salesRanking-enter-from,
.salesRanking-leave-to {
  height: 0;
  overflow: hidden;
  transition: height 0.5s linear;
}
</style>
