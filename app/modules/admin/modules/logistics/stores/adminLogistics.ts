import { defineStore } from "pinia";
import type { IAdminLogisticsStore } from "~/modules/admin/modules/logistics/types/Stores/adminLogistics.type";
import { logisticData } from "~/modules/admin/modules/logistics/components/Logistics/logisticsTable.data";

export const useAdminLogisticsStore = defineStore("adminLogistics", {
  state: (): IAdminLogisticsStore => ({
    activeOpenTabs: [],
    activeOpenTab: "",
    activeOpenEditTableTab: "",
    logisticsData: logisticData,
    addCityModal: false,
    showSelectMenuAddCityModal: false,
    selectedCityAddCityModal: null,
    citiesAddCityModal: [
      { id: 1, name: "Казань, Советский" },
      { id: 2, name: "Мирны, Яблоко" },
      { id: 3, name: "Мытищи, Сколкого" },
    ],
  }),
  actions: {},
});
