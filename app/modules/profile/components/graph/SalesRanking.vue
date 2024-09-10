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
        <div class="w-full rounded-lg">
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
                    <div class="h-full flex flex-col bg-gray-15-color border-l border-dark-charcoal-color">
                        <div class="relative flex items-center gap-[4px] hover:bg-gray-25-color px-2 py-1 z-[50]"
                            v-for="product in item.products"
                            @mouseenter="showProductItemID = item.id, showProductID = product.id"
                            @mouseleave="showProductItemID = null, showProductID = null">
                            <p class="flex-grow text-12-reg text-gray-90-color">{{ product.name }}</p>
                            <div class="w-[170px]">
                                <div class="totalPlan flex w-full h-2 bg-gray-40-color rounded-lg">
                                    <div class="sold relative flex h-full bg-secondary-color rounded-lg"
                                        :style="`width: calc(${((product.sold) / (totalPlan(product) * 1.3)) * 80}%)`">
                                        <div class="min-w-[4px] w-[4px] min-h-[12px] h-[12px] absolute top-[50%] translate-y-[-50%] z-[2]"
                                            :style="`left: calc(${(product.plan / (product.sold * 1.3)) * 100}%)`"
                                            :key="product.id">
                                            <div
                                                class="w-full h-full plan cursor-pointer flex rounded-[1px] bg-success-400 ">
                                            </div>

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
                            <template v-if="showProductItemID == item.id && showProductID == product.id">
                                <div
                                    class="w-max absolute bottom-[100%] left-[50%] translate-x-[-50%] translate-y-[-8px] z-[50] bg-dark-eerie-black-color border border-gray-40-color rounded-lg p-3 flex flex-col items-start justify-start">
                                    <div class="w-max flex mb-2">
                                        <p class="w-[65px] text-10-reg text-gray-90-color text-left">Фасовка</p>
                                        <p class="w-[50px] text-10-reg text-gray-90-color text-right">Кол-во</p>
                                        <p class="w-[80px] text-10-reg text-gray-90-color text-right">Вес</p>
                                        <p class="w-[80px] text-10-reg text-gray-90-color text-right">Сумма</p>
                                    </div>
                                    <div class="w-full h-[1px] bg-dark-charcoal-color"></div>
                                    <div class="w-max flex my-2">
                                        <div class="w-[65px] flex gap-2 flex-col items-start justify-center">
                                            <p class="text-10-ext text-gray-40-color">100 гр</p>
                                            <p class="text-10-ext text-gray-40-color">200 гр</p>
                                            <p class="text-10-ext text-gray-40-color">500 гр</p>
                                        </div>
                                        <div class="w-[50px] flex gap-2 flex-col items-end justify-center">
                                            <p class="text-10-ext text-gray-90-color">13</p>
                                            <p class="text-10-ext text-gray-90-color">23</p>
                                            <p class="text-10-ext text-gray-90-color">4</p>
                                        </div>
                                        <div class="w-[80px] flex gap-2 flex-col items-end justify-center">
                                            <p class="text-10-ext text-gray-90-color">32 500,00 гр</p>
                                            <p class="text-10-ext text-gray-90-color">115 500,05 гр</p>
                                            <p class="text-10-ext text-gray-90-color">999 000,99 гр</p>
                                        </div>
                                        <div class="w-[80px] flex gap-2 flex-col items-end justify-center">
                                            <p class="text-10-ext text-secondary-color">24 600 000</p>
                                            <p class="text-10-ext text-secondary-color">115 000 000</p>
                                            <p class="text-10-ext text-secondary-color">999 999 009</p>
                                        </div>
                                    </div>
                                    <div class="w-full h-[1px] bg-dark-charcoal-color"></div>
                                    <div class="w-max flex my-2">
                                        <div class="w-[65px] flex items-center justify-start">
                                            <p class="text-10-ext text-gray-90-color">Итого</p>
                                        </div>
                                        <div class="w-[50px] flex items-center justify-end">
                                            <p class="text-10-ext text-gray-90-color">40</p>
                                        </div>
                                        <div class="w-[80px] flex items-center justify-end">
                                            <p class="text-10-ext text-gray-90-color">999 009,05 гр</p>
                                        </div>
                                        <div class="w-[80px] flex items-center justify-end">
                                            <p class="text-10-ext text-secondary-color">999 000 000</p>
                                        </div>
                                    </div>
                                    <div class="w-full h-[1px] bg-dark-charcoal-color"></div>
                                    <div class="w-max flex mt-2">
                                        <div class="w-[65px] flex items-center justify-start">
                                            <p class="text-10-ext text-secondary-color">План</p>
                                        </div>
                                        <div class="w-[50px] flex items-center justify-end">
                                        </div>
                                        <div class="w-[80px] flex items-center justify-end">
                                            <p class="text-10-ext text-secondary-color">999 009,05 гр</p>
                                        </div>
                                        <div class="w-[80px] flex items-center justify-end">
                                        </div>
                                    </div>
                                </div>
                            </template>
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