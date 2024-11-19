import { defineStore } from "pinia";
import type { IAdminLogisticsStore } from "~/modules/admin/modules/logistics/types/Stores/adminLogistics.type";
import { logisticData } from "~/modules/admin/modules/logistics/components/Logistics/logisticsTable.data";

export const useAdminLogisticsStore = defineStore("adminLogistics", {
  state: (): IAdminLogisticsStore => ({
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
    addProductModal: false,
    showSelectMenuProductModal: false,
    selectedItemProductModal: null,
    productsProductModal: [
      { id: 1, name: "BCAA", weight: 30000, count: 20, price: 1000 },
      { id: 2, name: "Creatine", weight: 30000, count: 20, price: 1000 },
      { id: 3, name: "L-Carnitine", weight: 30000, count: 20, price: 1000 },
      { id: 4, name: "Iso Whey Zero", weight: 30000, count: 20, price: 1000 },
    ],
  }),
  actions: {},
});
