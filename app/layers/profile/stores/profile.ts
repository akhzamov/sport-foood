import { defineStore } from "pinia";
import type { IProfileStore } from "../types/mainStore.type";
import { daySalesData, monthAnnotation } from '~/layers/profile/components/chart/BarLineData'

export const useProfileStore = defineStore('profile', {
    state: (): IProfileStore => ({
        activeTab: null,
        activeDayFilter: 1,
        activeDayFilterBlocked: false,
        daySales: daySalesData,
        monthAnnotation: monthAnnotation
    }),
    actions: {
        async filterData() {
            switch (this.activeDayFilter) {
                case 1:
                    this.daySales = daySalesData.slice(0, 30);
                    break;
                case 2:
                    this.daySales = daySalesData.slice(0, 14);
                    break;
                case 3:
                    this.daySales = daySalesData.slice(0, 7);
                    break;
                case 4:
                    this.daySales = daySalesData.slice(0, 1);
                    break;
                default:
                    this.daySales = daySalesData;
                    break;
            }
        }
    },
})