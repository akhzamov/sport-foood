import { defineStore } from "pinia";
import type { IProfileStore } from "~/modules/profile/types/profileStore.type";
import { daySalesData, monthAnnotation } from '~/modules/profile/components/chart/BarLineData'

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