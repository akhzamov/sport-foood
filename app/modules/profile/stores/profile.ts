import { defineStore } from "pinia";
import type { IProfileStore } from "~/modules/profile/types/profileStore.type";

export const useProfileStore = defineStore("profile", {
  state: (): IProfileStore => ({
    activeTab: 1,
    activeDayFilter: 0,
    activeDayFilterValue: null,
    activeDayFilterBlocked: false,
    activeStoresSelect: false,
    monthAnnotation: 0,
    activeMoreInfo: false,
    selectedBranch: 0,
    salesPlan: null,
    chartLoader: false,
    selectedDate: "",
    selectedDateRU: "",
    salesPlanDay: null,
    salesPlanDayFirstRes: false,
    reportGraphStoreSelect: false,
    reportGraphAddSettingModal: false,
    reportGraphAddSettingSelectUser: false,
    marketplacesData: null,
    marketplacesTotalProfit: 0,
    marketplacesTotalSold: 0,
    marketplacesTotalSpending: 0,
    indexMarketplacesLeft: null,
    indexAgentsLeft: null,
    indexStoragesLeft: null,
    purchases: null,
    spending: null,
    spendingTotalAmount: null,
  }),
  actions: {
    async filterData() {
      console.log("filtered");
    },
  },
});
