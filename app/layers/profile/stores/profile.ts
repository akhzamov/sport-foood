import { defineStore } from "pinia";
import type { IProfileStore } from "../types/mainStore.type";
import { daySalesData, monthAnnotation } from '~/layers/profile/components/chart/BarLineData'

export const useProfileStore = defineStore('profile', {
    state: (): IProfileStore => ({
        activeTab: null,
        activeDayFilter: 1,
        activeDayFilterBlocked: false,
        daySales: daySalesData,
        monthAnnotation: monthAnnotation,
        activeMoreInfo: false,
    }),
    actions: {
        async filterData() {
            console.log('filtered');
        }
    },
})