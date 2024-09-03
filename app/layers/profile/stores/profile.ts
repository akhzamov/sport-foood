import { defineStore } from "pinia";
import type { IProfileStore } from "~/layers/profile/types/profileStore.type";
import { daySalesData, monthAnnotation } from '~/layers/profile/components/chart/BarLineData'

export const useProfileStore = defineStore('profile', {
    state: (): IProfileStore => ({
        activeTab: null,
        activeDayFilter: null,
        activeDayFilterBlocked: false,
        daySales: daySalesData,
        monthAnnotation: 0,
        activeMoreInfo: false,
        stores: null,
        selectedBranch: null,
        salesPlan: null,
        chartLoader: false,
    }),
    actions: {
        async filterData() {
            console.log('filtered');
        }
    },
})