import { defineStore } from "pinia";
import type { IMainStore } from "~/types/mainStore.type";

export const useMainStore = defineStore("main", {
  state: (): IMainStore => ({
    user: null,
    marketplaces: null,
    marketplaceById: null,
    errorMessage: "",
    alertShow: false,
    alertShowTitle: "",
    alertShowText: "",
    confirmModal: false,
    confirmModalTitle: "",
    confirmModalText: "",
  }),
  actions: {},
});
