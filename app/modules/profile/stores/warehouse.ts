import { defineStore } from "pinia";
import type { IWarehouseStore } from "~/modules/profile/types/Warehouse/store.type";

export const useWarehouseStore = defineStore("warehouse", {
  state: (): IWarehouseStore => ({
    isLoading: false,
    areas: null,
    selectedCities: [],
    storageTypes: null,
    activeStorageType: "RETAIL",
    storagesLeft: null,
    marketplaceLeft: null,
    salesAgentLeft: null,
  }),
  actions: {},
});
