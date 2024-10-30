import { defineStore } from "pinia";
import type { IAdminLogisticsStore } from "~/modules/admin/modules/logistics/types/Stores/adminLogistics.type";
import { logisticData } from "~/modules/admin/modules/logistics/components/Logistics/logisticsTable.data";

export const useAdminLogisticsStore = defineStore("adminLogistics", {
  state: (): IAdminLogisticsStore => ({
    activeOpenTabs: [],
    activeOpenTab: "",
    activeOpenEditTableTab: "",
    logisticsData: logisticData,
  }),
  actions: {},
});
