<script lang="ts" setup>

const marketplaces = [
    {
        id: 1,
        title: 'Ozon',
        subtitle: 'Площадка'
    },
    {
        id: 2,
        title: 'Worldsport',
        subtitle: 'Бот'
    },
    {
        id: 3,
        title: 'Tenor',
        subtitle: 'Бот'
    },
    {
        id: 4,
        title: 'Coldmans',
        subtitle: 'Площадка'
    },
    {
        id: 5,
        title: 'Zeus',
        subtitle: 'Площадка'
    },
    {
        id: 6,
        title: 'Yolo',
        subtitle: 'Бот'
    },
    {
        id: 7,
        title: 'Guru',
        subtitle: 'Бот'
    },
    {
        id: 8,
        title: 'Darkmoon',
        subtitle: 'Бот'
    },
    {
        id: 9,
        title: 'Darkmoon',
        subtitle: 'Бот'
    },
]
</script>

<template>
    <div class="w-[390px] rounded-lg overflow-hidden">
        <h4 class="px-5 h-[40px] flex items-center bg-dark-gunmental-color text-14-bold text-gray-90-color">
            Рейтинг площадок
        </h4>
        <div class="marketplaces flex flex-col w-full h-[360px] bg-dark-charcoal-color overflow-hidden overflow-y-auto">
            <!-- Заголовок таблицы -->
            <div class="flex w-full h-max bg-gray-15-color ">
                <div class="flex h-max w-full gap-2 py-[5px] pr-1">
                    <div class="flex flex-grow items-center gap-2">
                        <span class="w-4 h-4 block"></span>
                        <span class="text-10-reg text-gray-90-color">Все</span>
                    </div>
                    <div
                        class="flex h-[24px] flex-col justify-center bg-dark-charcoal-color rounded-[4px] border-[0.5px] border-gray-40-color p-[2px]">
                        <span class="text-7-reg text-gray-75-color text-right">Оборот</span>
                        <span class="text-8-med text-gray-90-color">11 107 250 руб.</span>
                    </div>
                    <div
                        class="flex h-[24px] flex-col bg-dark-charcoal-color rounded-[4px] border-[0.5px] border-gray-40-color p-[2px]">
                        <span class="text-7-reg text-gray-75-color">Расходы </span>
                        <span class="text-8-med text-gray-90-color">11 107 250 руб.</span>
                    </div>
                    <div class="flex w-[56px] h-[24px] flex-col gap-[2px] justify-center px-1">
                        <div class="flex items-center gap-[3px]">
                            <div class="block w-[5px] h-[1px] rounded-[1px] bg-marketplace-line-bg-liner-left"></div>
                            <span class="text-7-reg text-gray-90-color">Прибыль</span>
                            <div class="block w-[5px] h-[1px] rounded-[1px] bg-marketplace-line-bg-liner-right"></div>
                        </div>
                        <div class="flex h-[6px] gap-[1.5px] rounded-[5px] overflow-hidden">
                            <div class="negative bg-error-color block" :style="'width: 20px'"></div>
                            <div class="positive bg-secondary-color block" :style="'width: 80px'"></div>
                        </div>
                    </div>
                    <div
                        class="flex h-[24px] flex-col bg-dark-charcoal-color rounded-[4px] border-[0.5px] border-gray-40-color p-[2px]">
                        <span class="text-7-reg text-gray-75-color text-center">Чистая прибыль</span>
                        <span class="text-8-med text-gray-90-color">11 107 250 руб.</span>
                    </div>
                </div>
            </div>

            <!-- Строки таблицы -->
            <div class="flex w-full h-max" v-for="market in marketplaces" :key="market.id" :class="{
                'bg-marketplace-line-bg-top-liner': market.id === 1,
                'bg-dark-gunmental-color': market.id % 2 === 0 && market.id != 1,
                'bg-dark-charcoal-color': market.id % 2 === 1 && market.id != 1
            }">
                <div class="flex h-max w-full gap-2 py-2 pr-1">
                    <div class="flex flex-grow items-center gap-2 h-6">
                        <div class="w-4 h-[18px] flex items-center justify-start gap-[3px]">
                            <div class="w-[1px] h-full block rounded-e-[4px]"
                                :class="{ 'bg-success-color': market.id == 1, 'bg-transparent': market.id != 1 }"></div>
                            <span class="text-12-bold text-gray-40-color">{{ market.id }}</span>
                        </div>
                        <div class="flex items-center justify-start gap-[5px]">
                            <img src="~/assets/img/ozon.png" alt=""
                                class="w-6 h-6 rounded-[50%] object-cover object-center overflow-hidden">
                            <div class="flex flex-col items-start justify-center gap-[2px]">
                                <span class="text-10-semi text-gray-90-color">{{ market.title }}</span>
                                <span class="text-8-reg text-gray-75-color">{{ market.subtitle }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="flex h-[24px] flex-col justify-center border-gray-40-color p-[2px]">
                        <div class="flex items-center gap-[4px]">
                            <span class="text-7-reg text-gray-75-color text-right">Оборот</span>
                            <span class="text-7-reg text-success-color">(13%)</span>
                        </div>
                        <span class="text-8-med text-gray-90-color">11 107 250 руб.</span>
                    </div>
                    <div class="flex h-[24px] flex-col border-gray-40-color p-[2px]">
                        <span class="text-7-reg text-gray-75-color">Расходы </span>
                        <span class="text-8-med text-gray-90-color">11 107 250 руб.</span>
                    </div>
                    <div class="flex w-[56px] h-[24px] flex-col gap-[2px] justify-center px-1">
                        <div class="flex items-center gap-[3px]">
                            <div class="block w-[5px] h-[1px] rounded-[1px] bg-marketplace-line-bg-liner-left"></div>
                            <span class="text-7-reg text-gray-90-color">Прибыль</span>
                            <div class="block w-[5px] h-[1px] rounded-[1px] bg-marketplace-line-bg-liner-right"></div>
                        </div>
                        <div class="flex h-[6px] gap-[1.5px] rounded-[5px] overflow-hidden">
                            <div class="negative bg-error-color block" :style="'width: 20px'"></div>
                            <div class="positive bg-secondary-color block" :style="'width: 80px'"></div>
                        </div>
                    </div>
                    <div class="flex h-[24px] flex-col border-gray-40-color p-[2px]">
                        <span class="text-7-reg text-gray-75-color text-center">Чистая прибыль</span>
                        <span class="text-8-med text-gray-90-color">11 107 250 руб.</span>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<style scoped>
.marketplaces {
    scrollbar-width: thin;
    scrollbar-color: #6B7280 #2b2f33;
}

.marketplaces::-webkit-scrollbar {
    width: 8px;
}

.marketplaces::-webkit-scrollbar-track {
    background-color: #2b2f33;
    border-radius: 8px !important;
}

.marketplaces::-webkit-scrollbar-thumb {
    background-color: #6B7280;
    border-radius: 8px !important;
    border: 2px solid #2b2f33;
}
</style>