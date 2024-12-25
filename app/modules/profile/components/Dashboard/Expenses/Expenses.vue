<script lang="ts" setup>
import { useProfileStore } from "~/modules/profile/stores/profile";

const profileStore = useProfileStore();
const activeSpending = ref<null | number>(null);
const calcSoldPercentage = (sold: number) => {
  if (sold == 0) {
    return 0;
  }
  return (sold / profileStore.marketplacesTotalSold) * 100;
};

const amountWidth = (spending: number): number => {
  const totalAmount = profileStore.spendingTotalAmount || 0;
  if (totalAmount > 0) {
    return (spending / totalAmount) * 100;
  }
  return 0;
};
onMounted(() => {});
</script>

<template>
  <div class="w-[390px] rounded-lg overflow-hidden">
    <h4
      class="px-5 h-[40px] flex items-center bg-dark-gunmental-color text-14-bold text-gray-90-color"
    >
      Расходы
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
            class="flex w-[90px] h-full flex-col items-end justify-center bg-gray-15-color rounded-[4px] border-[0.5px] border-gray-40-color p-[2px]"
          >
            <span class="text-10-ext text-gray-75-color text-center">
              Сумма
            </span>
            <span class="text-12-reg text-gray-90-color">
              {{
                profileStore.spendingTotalAmount
                  ? profileStore.spendingTotalAmount.toLocaleString()
                  : 0
              }}
            </span>
          </div>
        </div>
      </div>

      <!-- Строки таблицы -->
      <div
        class="relative flex w-full h-[30px] border"
        v-for="(spending, key, index) in profileStore.spending"
        :key="key"
        @mouseenter="activeSpending = Number(index)"
        @mouseleave="activeSpending = null"
        :class="{
          'bg-dark-gunmental-color': Number(index) % 2 === 0,
          'bg-dark-charcoal-color': Number(index) % 2 !== 0,
          'border-gray-90-color': activeSpending == Number(index),
          'border-transparent': activeSpending != Number(index),
        }"
      >
        <div class="w-full z-[2] flex h-full py-[7px]">
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
                {{ Number(index + 1) }}
              </span>
            </div>
            <div class="flex items-center justify-start gap-[5px]">
              <div class="flex flex-col items-start justify-center gap-[2px]">
                <span class="text-10-semi text-gray-90-color">
                  {{ spending.name }}
                </span>
                <!-- <span class="text-10-reg text-gray-75-color">{{
									market.subtitle
								}}</span> -->
              </div>
            </div>
          </div>
          <div class="w-[130px] flex items-center justify-center">
            <div
              class="relative w-full h-[12px] overflow-hidden rounded-lg block bg-gray-40-color"
            >
              <!-- Заполненная полоса длs оборота -->
              <div
                class="sticky left-0 top-0 h-full"
                :style="{
                  width: `${
                    amountWidth(spending.amount) < 10 &&
                    amountWidth(spending.amount) > 0
                      ? amountWidth(spending.amount) + 4
                      : amountWidth(spending.amount)
                  }%`,
                }"
                :class="[
                  amountWidth(spending.amount) >= 80
                    ? 'bg-error-500'
                    : amountWidth(spending.amount) >= 50
                    ? 'bg-orange-400'
                    : amountWidth(spending.amount) <= 10
                    ? 'bg-yellow-500'
                    : '',
                ]"
              ></div>
            </div>
          </div>
          <div
            class="flex w-[90px] h-full flex-col items-end justify-between border-gray-40-color mr-1 p-[1px]"
          >
            <span class="text-12-reg text-gray-90-color">
              {{ spending.amount.toLocaleString() }}
            </span>
          </div>
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
