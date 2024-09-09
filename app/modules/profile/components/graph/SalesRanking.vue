<script lang="ts" setup>
import { data } from '~/modules/profile/components/graph/SalesRanking.data'
import type { ISalesRankingProducts } from '~/modules/profile/types/salesRanking.type'



const showProductItemID = ref<number | null>(null)
const showProductID = ref<number | null>(null)

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
            <div class="chart-wrapper grid grid-cols-3 grid-rows-subgrid bg-dark-charcoal-color ">
                <div class="w-full h-full flex flex-col " v-for="item in data.data" :key="item.name">
                    <div
                        class="w-full min-h-9 h-full flex items-center justify-between bg-dark-charcoal-color px-2 border-l border-gray-15-color">
                        <div class="flex items-center justify-start gap-2">
                            <img src="~/assets/img/ozon.png" alt="marketplace-image"
                                class="w-7 h-7 object-fill object-center rounded-[50%]">
                            <div class="flex flex-col items-start">
                                <p class="text-12-bold text-gray-90-color">{{ item.name }}</p>
                                <p class="text-12-ext text-gray-75-color">{{ item.type }}</p>
                            </div>
                        </div>
                        <div class="flex items-center justify-end gap-1">
                            <p class="text-12-bold text-gray-90-color">{{ item.totalSum.toLocaleString() }}</p>
                            <IconCoinsStacked class="text-gray-90-color" />
                        </div>
                    </div>
                    <div
                        class="h-full flex flex-col gap-3 px-1 py-2 bg-gray-15-color border-l border-dark-charcoal-color">
                        <div class="flex items-center gap-[4px]" v-for="product in item.products">
                            <p class="flex-grow text-12-reg text-gray-90-color">{{ product.name }}</p>
                            <div class="w-[170px]">
                                <div class="totalPlan relative flex w-full h-2 bg-gray-40-color rounded-lg">
                                    <div class="sold relative flex h-full bg-secondary-color rounded-lg"
                                        :style="`width: calc(${((product.sold) / (totalPlan(product) * 1.3)) * 80}%)`">
                                        <div class="min-w-[4px] w-[4px] min-h-[12px] h-[12px] absolute top-[50%] translate-y-[-50%] z-[2]"
                                            :style="`left: calc(${(product.plan / (product.sold * 1.3)) * 100}%)`"
                                            @mouseenter="showProductItemID = item.id, showProductID = product.id"
                                            @mouseleave="showProductItemID = null, showProductID = null"
                                            :key="product.id">
                                            <div
                                                class="w-full h-full plan cursor-pointer border border-transparent hover:border-primary-color flex rounded-[1px] bg-success-400 ">
                                            </div>

                                        </div>

                                    </div>
                                    <div class="w-max absolute bottom-[100%] left-[50%] translate-x-[-50%] translate-y-[-8px] z-[20] bg-dark-eerie-black-color border border-gray-40-color rounded-lg p-3 flex flex-col items-start justify-start"
                                        v-if="showProductItemID == item.id && showProductID == product.id">
                                        <span class="text-10-ext text-gray-90-color">{{ product.name }}</span>
                                        <div class="block w-full h-[1px] bg-gray-40-color mt-1"></div>
                                        <div class="flex items-center gap-1 mt-2">
                                            <div class="w-[10px] h-[10px] rounded-[50%] bg-white block"></div>
                                            <span class="text-10-ext text-gray-75-color">План</span>
                                            <span class="text-10-ext text-gray-90-color">{{
                                                product.plan.toLocaleString() }}
                                                гр</span>
                                        </div>
                                        <div class="flex items-center gap-1 mt-2">
                                            <div class="w-[10px] h-[10px] rounded-[50%] bg-secondary-color">
                                            </div>
                                            <span class="text-10-ext text-gray-75-color">Продано</span>
                                            <span class="text-10-ext text-gray-90-color">{{
                                                product.sold.toLocaleString() }}
                                                гр</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="w-[140px] flex items-center justify-end gap-[7px]">
                                <span class="text-12-reg text-gray-90-color">{{ product.sold.toLocaleString() }}
                                    гр</span>
                                <span class="text-10-reg w-[40px] text-end"
                                    :class="{ 'text-success-400': product.sold > product.plan, 'text-error-400': product.sold < product.plan }">
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