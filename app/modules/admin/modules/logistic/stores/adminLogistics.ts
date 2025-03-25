import { defineStore } from "pinia";
import type { IAdminLogisticsStore } from "~/modules/admin/modules/logistic/types/Stores/adminLogistics.type";

export const useAdminLogisticsStore = defineStore("adminLogistics", {
  state: (): IAdminLogisticsStore => ({
    activeOpenEditTableTab: null,
    logisticsData: null,
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
    showSelectMenuWeightModal: false,
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
