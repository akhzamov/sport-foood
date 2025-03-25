import { defineStore } from "pinia";
import type { ILogisticStore } from "../types/Stores/logisticStore.type";
import { useSessionStorage } from "@vueuse/core";

export const useLogisticStore = defineStore("logistic", {
  state: (): ILogisticStore => ({
    shipments: null,
    shipment: null,
    shipmentPackages: null,
    shipmentArrPoints: null,
    shipmentsPagination: null,
    shipmentsPage: useSessionStorage("shipmentsPage", 1),
    perPage: 15,
    addCityModal: false,
    addProductModal: false,
  }),
  actions: {},
});
