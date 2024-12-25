<script lang="ts" setup>
import { useProfileStore } from "~/modules/profile/stores/profile";

const profileStore = useProfileStore();
const activeMarketplaceInfo = ref<null | number>(null);
const calcSoldPercentage = (sold: number) => {
  if (sold == 0) {
    return 0;
  }
  return (sold / profileStore.marketplacesTotalSold) * 100;
};
const calcSpendingWidth = (spending: number, sold: number) => {
  return Math.floor((spending / sold) * 100).toFixed(2);
};
const calcTotalProfitWidth = (totalProfit: number, sold: number) => {
  return Math.floor((totalProfit / sold) * 100).toFixed(2);
};
const profitWidth = (market: any) => {
  const profit = market.sold - market.spending;
  return `${(profit / market.sold) * 100}%`;
};

// Ширина полосы для расходов
const spendingWidth = (market: any) => {
  return `${(market.spending / market.sold) * 100}%`;
};
onMounted(() => {});
</script>

<template>
  <div class="w-[390px] rounded-lg overflow-hidden">
    <h4
      class="px-5 h-[40px] flex items-center bg-dark-gunmental-color text-14-bold text-gray-90-color"
    >
      Рейтинг площадок
    </h4>
    <div
      class="marketplaces flex flex-col w-full h-[360px] bg-dark-charcoal-color overflow-hidden overflow-y-auto"
    >
      <!-- Заголовок таблицы -->
      <div class="flex w-full h-max bg-dark-charcoal-color">
        <div class="flex w-full h-[37px] py-[4px] pr-1">
          <div class="flex flex-grow items-center gap-2">
            <span class="w-4 h-4 block"></span>
            <span class="text-12-med text-gray-90-color">Все</span>
          </div>
          <div
            class="flex w-[80px] h-full flex-col items-end justify-center bg-dark-charcoal-color rounded-[4px] border-[0.5px] border-gray-40-color p-[2px] mr-[15px]"
          >
            <span class="text-10-ext text-gray-75-color text-right"
              >Оборот</span
            >
            <span class="text-12-reg text-gray-90-color">
              {{ profileStore.marketplacesTotalSold.toLocaleString() }}
            </span>
          </div>
          <div
            class="flex w-[80px] h-full flex-col items-end justify-center bg-red-20-color rounded-[4px] border-[0.5px] border-gray-40-color p-[2px] mr-[5px]"
          >
            <span class="text-10-ext text-gray-75-color">Расходы </span>
            <span class="text-12-reg text-gray-90-color">
              {{ profileStore.marketplacesTotalSpending.toLocaleString() }}
            </span>
          </div>
          <div
            class="flex w-[90px] h-full flex-col items-end justify-center bg-green-20-color rounded-[4px] border-[0.5px] border-gray-40-color p-[2px]"
          >
            <span class="text-10-ext text-gray-75-color text-center"
              >Чистая прибыль</span
            >
            <span class="text-12-reg text-gray-90-color">
              {{ profileStore.marketplacesTotalProfit.toLocaleString() }}
            </span>
          </div>
        </div>
      </div>

      <!-- Строки таблицы -->
      <div
        class="relative flex w-full h-[40px] border"
        v-for="(market, key) in profileStore.marketplacesData"
        :key="key"
        @mouseenter="activeMarketplaceInfo = Number(key)"
        @mouseleave="activeMarketplaceInfo = null"
        :class="{
          'bg-dark-gunmental-color': Number(key) % 2 !== 0,
          'bg-dark-charcoal-color': Number(key) % 2 === 0,
          'border-gray-90-color': activeMarketplaceInfo == Number(key),
          'border-transparent': activeMarketplaceInfo != Number(key),
        }"
      >
        <div class="w-full z-[2] flex h-full py-[7px] pr-[6px]">
          <div class="flex flex-grow items-center gap-2 h-full">
            <div class="w-4 h-[18px] flex items-center justify-start gap-[3px]">
              <div
                class="w-[1px] h-full block rounded-e-[4px]"
                :class="{
                  'bg-success-color': Number(key) == 1,
                  'bg-transparent': Number(key) != 1,
                }"
              ></div>
              <span class="text-12-bold text-gray-40-color">
                {{ Number(key) }}
              </span>
            </div>
            <div class="flex items-center justify-start gap-[5px]">
              <img
                src="~/assets/img/ozon.png"
                alt=""
                class="w-6 h-6 rounded-[50%] object-cover object-center overflow-hidden"
              />
              <div class="flex flex-col items-start justify-center gap-[2px]">
                <span class="text-10-semi text-gray-90-color">
                  {{ market.name }}
                </span>
                <!-- <span class="text-10-reg text-gray-75-color">{{
									market.subtitle
								}}</span> -->
              </div>
            </div>
          </div>
          <div class="flex items-center justify-center">
            <div
              class="relative w-[120px] h-[12px] overflow-hidden rounded-lg block bg-gray-40-color"
            >
              <!-- Заполненная полоса для оборота -->
              <div
                class="absolute left-0 top-0 h-full bg-malachite opacity-[48%]"
                :style="{ width: profitWidth(market) }"
              ></div>
              <!-- Заполненная полоса для расхода -->
              <div
                class="absolute right-0 top-0 h-full bg-malachite"
                :style="{ width: spendingWidth(market) }"
              ></div>
            </div>
          </div>
          <div
            class="flex w-[116px] h-full flex-col items-end justify-between border-gray-40-color mr-1 p-[1px]"
          >
            <div class="flex items-center gap-[4px]">
              <span class="text-10-ext text-gray-75-color text-right">
                Оборот
              </span>
              <span class="text-10-ext text-success-500">
                {{ calcSoldPercentage(market.sold).toFixed(0) }}%
              </span>
            </div>
            <span class="text-12-reg text-gray-90-color">
              {{ market.sold.toLocaleString() }}
            </span>
          </div>
        </div>
        <div
          class="absolute top-[50%] left-[15%] w-[150px] h-auto translate-y-[40%] z-[100] bg-dark-gunmental-color border border-gray-15-color p-3 rounded-lg"
          v-if="Number(key) == activeMarketplaceInfo"
        >
          <h4 class="text-12-reg text-white">{{ market.name }}</h4>
          <p
            class="text-8-reg text-gray-75-color flex items-center justify-between mt-1"
          >
            Оборот: <span>{{ market.sold.toLocaleString() }}</span>
          </p>
          <div class="w-full h-[1px] block bg-gray-15-color my-[3px]"></div>
          <p
            class="text-8-reg text-error-500 flex items-center justify-between mt-1"
          >
            Расход: <span>{{ market.spending.toLocaleString() }}</span>
          </p>
          <div class="w-full h-[1px] block bg-gray-15-color my-[3px]"></div>
          <p
            class="text-8-reg text-success-500 flex items-center justify-between mt-1"
          >
            Чистая прибыль:
            <span>{{ market.totalProfit.toLocaleString() }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.marketplaces {
  scrollbar-width: thin;
  scrollbar-color: #6b7280 #2b2f33;
}

.marketplaces::-webkit-scrollbar {
  width: 8px;
}

.marketplaces::-webkit-scrollbar-track {
  background-color: #2b2f33;
  border-radius: 8px !important;
}

.marketplaces::-webkit-scrollbar-thumb {
  background-color: #6b7280;
  border-radius: 8px !important;
  border: 2px solid #2b2f33;
}
</style>
