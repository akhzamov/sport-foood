<script lang="ts" setup>
import { data } from '~/layers/profile/components/graph/SalesRanking.data'
import type { ISalesRankingProducts } from '~/layers/profile/types/salesRanking.type'


const calculateDeviation = (currentValue: number | null | undefined, norm: string | number) => {
    const difference = Number(currentValue) - Number(norm);
    const percentageDeviation = (difference / Number(norm)) * 100;
    return `${Math.abs(percentageDeviation).toFixed(1)}%`
}

const totalPlan = (item: ISalesRankingProducts) => {
    if (item.plan > item.sold) {
        return item.plan
    } else {
        return item.sold
    }
}

</script>

<template>
    <Transition name="more-info">
        <div class="w-full rounded-lg overflow-hidden">
            <h4 class="px-5 h-[40px] flex items-center bg-dark-gunmental-color text-14-bold text-gray-90-color">
                Рейтинг продаж
            </h4>
            <div class="chart-wrapper grid grid-cols-4 grid-rows-subgrid bg-dark-charcoal-color ">
                <div class="w-full h-full flex flex-col " v-for="item in data.data" :key="item.name">
                    <div
                        class="w-full min-h-8 h-full flex items-center justify-between bg-dark-charcoal-color px-2 border-l border-gray-15-color">
                        <div class="flex items-center justify-start gap-2">
                            <img src="~/assets/img/ozon.png" alt="marketplace-image"
                                class="w-6 h-6 object-fill object-center rounded-[50%]">
                            <div class="flex flex-col items-start">
                                <p class="text-10-semi text-gray-90-color">{{ item.name }}</p>
                                <p class="text-10-ext text-gray-75-color">{{ item.type }}</p>
                            </div>
                        </div>
                        <div class="flex items-center justify-end gap-1">
                            <p class="text-10-semi text-gray-90-color">{{ item.totalSum.toLocaleString() }}</p>
                            <IconCoinsStacked class="text-gray-90-color" />
                        </div>
                    </div>
                    <div class="h-full flex flex-col gap-1 p-1 bg-gray-15-color border-l border-dark-charcoal-color">
                        <div class="flex items-center gap-[4px]" v-for="(product, i) in item.products" :key="i">
                            <p class="flex-grow text-10-reg text-gray-90-color">{{ product.name }}</p>
                            <div class="w-[170px]">
                                <div class="totalPlan flex w-full h-2 bg-gray-40-color rounded-lg">
                                    <div class="sold relative flex h-full bg-secondary-color rounded-lg"
                                        :style="`width: calc(${((product.sold) / (totalPlan(product) * 1.3)) * 80}%)`">
                                        <div class="plan absolute z-[2] flex min-w-[10px] min-h-[10px] w-[10px] h-[10px] rounded-[50%] bg-white top-[50%] translate-y-[-50%]"
                                            :style="`left: calc(${(product.plan / (product.sold * 1.3)) * 100}%)`">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="w-[56px] flex items-center justify-center gap-[2px]">
                                <span class="text-10-reg text-gray-90-color">{{ product.sold }}</span>
                                <span class="text-8-reg"
                                    :class="{ 'text-success-color': product.sold > product.plan, 'text-error-color': product.sold < product.plan }">
                                    ({{ calculateDeviation(product.sold, product.plan) }})
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Transition>
</template>

<style scoped>
.more-info-enter-active,
.more-info-leave-active {
    height: 400px;
    transition: height 0.5s linear;
}

.more-info-enter-from,
.more-info-leave-to {
    height: 0;
    transition: height 0.5s linear;
}
</style>