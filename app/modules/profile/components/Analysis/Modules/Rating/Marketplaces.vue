<script lang="ts" setup>

const marketplaces = [
    {
        id: 1,
        title: 'Ozon',
        subtitle: 'Площадка',
        red: 20,
        green: 80,
    },
    {
        id: 2,
        title: 'Worldsport',
        subtitle: 'Бот',
        red: 30,
        green: 70,
    },
    {
        id: 3,
        title: 'Tenor',
        subtitle: 'Бот',
        red: 40,
        green: 60,
    },
    {
        id: 4,
        title: 'Coldmans',
        subtitle: 'Площадка',
        red: 10,
        green: 90,
    },
    {
        id: 5,
        title: 'Zeus',
        subtitle: 'Площадка',
        red: 5,
        green: 95,
    },
    {
        id: 6,
        title: 'Yolo',
        subtitle: 'Бот',
        red: 0,
        green: 100,
    },
    {
        id: 7,
        title: 'Guru',
        subtitle: 'Бот',
        red: 80,
        green: 20,
    },
    {
        id: 8,
        title: 'Darkmoon',
        subtitle: 'Бот',
        red: 60,
        green: 40,
    },
    {
        id: 9,
        title: 'Darkmoon',
        subtitle: 'Бот',
        red: 50,
        green: 50,
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
            <div class="flex w-full h-max bg-dark-charcoal-color">
                <div class="flex w-full h-[37px]  py-[4px] pr-1">
                    <div class="flex flex-grow items-center gap-2">
                        <span class="w-4 h-4 block"></span>
                        <span class="text-12-med text-gray-90-color">Все</span>
                    </div>
                    <div
                        class="flex w-[80px] h-full flex-col items-end justify-center bg-dark-charcoal-color rounded-[4px] border-[0.5px] border-gray-40-color p-[2px] mr-[15px]">
                        <span class="text-10-ext text-gray-75-color text-right">Оборот</span>
                        <span class="text-12-reg text-gray-90-color">11 107 250</span>
                    </div>
                    <div
                        class="flex w-[80px] h-full flex-col items-end justify-center bg-red-20-color rounded-[4px] border-[0.5px] border-gray-40-color p-[2px] mr-[5px]">
                        <span class="text-10-ext text-gray-75-color">Расходы </span>
                        <span class="text-12-reg text-gray-90-color">11 107 250</span>
                    </div>
                    <div
                        class="flex w-[90px] h-full flex-col items-end justify-center bg-green-20-color rounded-[4px] border-[0.5px] border-gray-40-color p-[2px]">
                        <span class="text-10-ext text-gray-75-color text-center">Чистая прибыль</span>
                        <span class="text-12-reg text-gray-90-color">11 107 250</span>
                    </div>
                </div>
            </div>

            <!-- Строки таблицы -->
            <div class="relative flex w-full h-[40px]" v-for="market in marketplaces" :key="market.id" :class="{
                'bg-dark-gunmental-color': market.id % 2 === 0 && market.id != 1,
                'bg-dark-charcoal-color': market.id % 2 === 1 && market.id != 1
            }">
                <div class="w-full z-[2] flex  h-full py-[7px] pr-[6px]">
                    <div class="flex flex-grow items-center gap-2 h-full">
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
                                <span class="text-10-reg text-gray-75-color">{{ market.subtitle }}</span>
                            </div>
                        </div>
                    </div>
                    <div
                        class="flex w-[80px] h-full flex-col items-center justify-between border-gray-40-color mr-1 p-[1px]">
                        <div class="flex items-center gap-[4px]">
                            <span class="text-10-ext text-gray-75-color text-right">Оборот</span>
                            <span class="text-10-ext text-success-500">(13%)</span>
                        </div>
                        <span class="text-12-reg text-gray-90-color">11 107 250</span>
                    </div>
                    <div
                        class="flex w-[80px] h-full flex-col items-end justify-between border-gray-40-color mr-[15px] p-[1px]">
                        <span class="text-10-ext text-gray-75-color">Расходы </span>
                        <span class="text-12-reg text-gray-90-color">11 107 250</span>
                    </div>
                    <div class="flex w-[80px] h-full flex-col items-end justify-between border-gray-40-color p-[1px]">
                        <span class="text-10-ext text-gray-75-color text-center">Чистая прибыль</span>
                        <span class="text-12-reg text-gray-90-color">11 107 250</span>
                    </div>
                </div>
                <div class="absolute w-[100%] h-full z-[1] flex items-center justify-start">
                    <div class="block h-full bg-red-20-color" :style="`width: ${market.red}%;`"></div>
                    <div class="block h-full bg-green-20-color" :style="`width: ${market.green}%;`"></div>
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