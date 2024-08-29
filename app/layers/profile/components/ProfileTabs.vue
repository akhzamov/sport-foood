<script lang="ts" setup>
import { useProfileStore } from '~/layers/profile/stores/profile';

const profileStore = useProfileStore()
const activeMoreInfo = computed(() => profileStore.activeMoreInfo)
const activeDayFilterBlocked = computed(() => profileStore.activeDayFilterBlocked)
const daysFilter = reactive([
    { id: 1, title: '30 д', value: 30, active: true },
    { id: 2, title: '14 д', value: 14, active: false },
    { id: 3, title: '7 д', value: 7, active: false },
    { id: 4, title: '24 ч', value: 0, active: false },
])
const activeTab = (id: number) => {
    if (!profileStore.activeDayFilterBlocked) {
        daysFilter.forEach((item) => {
            item.active = false
            if (item.id == id) {
                item.active = true
                profileStore.activeDayFilter = id
                profileStore.activeDayFilterBlocked = true
                setTimeout(() => {
                    profileStore.activeDayFilterBlocked = false
                }, 1000);
            }
        })
    }
}

const moreInfo = ref<HTMLElement | null>(null)

function scrollTo() {
    if (moreInfo.value) {
        moreInfo.value.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
}

watch(activeMoreInfo, (newValue) => {
    if (newValue) {
        setTimeout(() => {
            scrollTo()
        }, 500);
    }
}, { immediate: true });

onMounted(() => {
    activeTab(1)
    profileStore.activeDayFilter = 1
})
</script>

<template>
    <div class="container-custom">
        <div class="flex items-center justify-between pt-12">
            <h2 class="text-32-semi text-gray-90-color">Анализ</h2>
            <div class="flex items-center justify-center gap-2 rounded-md p-1"
                :class="{ 'bg-dark-onix-color': !activeDayFilterBlocked, 'bg-gray-15-color': activeDayFilterBlocked }">
                <div v-for="day in daysFilter" :key="day.id"
                    class="w-20 h-[30px] flex items-center justify-center rounded-[4px]" :class="{
                        'bg-primary-color': day.active && !activeDayFilterBlocked,
                        'bg-gray-40-color': day.active && activeDayFilterBlocked,
                        'cursor-pointer': !activeDayFilterBlocked,
                        'cursor-not-allowed': activeDayFilterBlocked,
                        'bg-transparent': !day.active,
                    }" @click="activeTab(day.id)">
                    <span class="text-14-med" :class="{
                        'text-dark-night-color': day.active && !activeDayFilterBlocked,
                        'text-gray-90-color': !day.active && !activeDayFilterBlocked,
                        'text-dark-charcoal-color': day.active && activeDayFilterBlocked,
                        'text-gray-40-color': !day.active && activeDayFilterBlocked
                    }">{{
                        day.title }}</span>
                </div>
            </div>
        </div>
        <div class="w-full grid grid-cols-custom-3-390 gap-6 justify-center mt-4">
            <ChartBarLine />
            <RatingMarketplaces />
            <GraphFirst />
        </div>
        <div class="w-full grid grid-cols-1 mt-4 pb-16" ref="moreInfo">
            <Transition name="more-info">
                <div class="w-full rounded-lg overflow-hidden" v-if="profileStore.activeMoreInfo">
                    <h4 class="px-5 h-[40px] flex items-center bg-dark-gunmental-color text-14-bold text-gray-90-color">
                        План продаж
                    </h4>
                    <div class="chart-wrapper flex overflow-y-auto h-[360px] bg-dark-charcoal-color ">
                    </div>
                </div>
            </Transition>
        </div>
    </div>
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
</style>ter