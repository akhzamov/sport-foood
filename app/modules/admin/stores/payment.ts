import { defineStore } from "pinia";
import type { IPaymentStore } from "../types/Stores/paymentStore.type";

export const usePaymentStore = defineStore("payment", {
  state: (): IPaymentStore => ({
    perPage: 15,
    paymentRequestsPage: 1,
    paymentRequestsPagination: null,
    filteredStores: [],
    filteredCities: [],
    filteredStatus: "",
    filteredType: "",
    filteredPriority: "",
    filteredPaymentId: null,
    types: null,
    statuses: null,
    priorities: null,
    stores: null,
    areas: null,
    payments: null,
    filterShow: false,
  }),
  actions: {},
});
