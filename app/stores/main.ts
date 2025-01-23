import { defineStore } from "pinia";
import type { IMainStore } from "~/types/mainStore.type";

export const useMainStore = defineStore("main", {
  state: (): IMainStore => ({
    user: null,
    marketplaces: null,
    marketplaceById: null,
    errorMessage: "",
    alertShow: false,
    alertShowType: "",
    alertShowTitle: "",
    alertShowText: "",
    confirmModal: false,
    confirmModalTitle: "",
    confirmModalText: "",
    isLoading: false,
    stores: null,
  }),
  actions: {},
});
