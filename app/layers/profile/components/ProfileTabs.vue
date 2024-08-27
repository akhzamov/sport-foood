<script lang="ts" setup>
import { useProfileStore } from '../stores/profile';
import ChartsBarLine from './Сharts/BarLine.vue'


const profileStore = useProfileStore()
const daysFilter = reactive([
    { id: 1, title: '30 д', active: true },
    { id: 2, title: '14 д', active: false },
    { id: 3, title: '7 д', active: false },
    { id: 4, title: '1 д', active: false },
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

onMounted(() => {
    activeTab(1)
    profileStore.activeDayFilter = 1
})
</script>

<template>
    <div class="container-custom">
        <div class="flex items-center justify-between pt-12">
            <h2 class="text-32-semi text-gray-90-color">Анализ</h2>
            <div class="flex items-center justify-center gap-2 bg-dark-onix-color rounded-md p-1"
                v-if="!profileStore.activeDayFilterBlocked">
                <div v-for="day in daysFilter" :key="day.id"
                    class="w-20 h-[30px] flex items-center justify-center rounded-[4px] cursor-pointer" :class="{
                        'bg-primary-color': day.active,
                        'bg-transparent': !day.active,
                    }" @click="activeTab(day.id)">
                    <span class="text-14-med" :class="day.active ? 'text-dark-night-color' : 'text-gray-90-color'">{{
                        day.title }}</span>
                </div>
            </div>
            <div class="flex items-center justify-center gap-2 bg-dark-onix-color rounded-md p-1"
                v-else-if="profileStore.activeDayFilterBlocked">
                <div
                    class="w-20 h-[30px] flex items-center justify-center rounded-[4px] text-gray-90-color bg-dark-night-color">
                    -</div>
                <div
                    class="w-20 h-[30px] flex items-center justify-center rounded-[4px] text-gray-90-color bg-dark-night-color">
                    -</div>
                <div
                    class="w-20 h-[30px] flex items-center justify-center rounded-[4px] text-gray-90-color bg-dark-night-color">
                    -</div>
                <div
                    class="w-20 h-[30px] flex items-center justify-center rounded-[4px] text-gray-90-color bg-dark-night-color">
                    -</div>
            </div>
        </div>
        <div class="mt-4">
            <ChartsBarLine />
        </div>
    </div>
</template>

<style scoped></style>