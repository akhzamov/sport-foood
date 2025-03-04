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
    confirmAlertShow: false,
    confirmAlertShowType: "",
    confirmAlertShowTitle: "",
    confirmAlertShowText: "",
    confirmCallback: null,
    rightAlertShow: false,
    rightAlertShowType: "",
    rightAlertShowText: "",
    confirmModal: false,
    confirmModalTitle: "",
    confirmModalText: "",
    isLoading: false,
    stores: null,
  }),
  actions: {
    showConfirm(type: string, title: string, text: string): Promise<boolean> {
      this.confirmAlertShow = true;
      this.confirmAlertShowTitle = title;
      this.confirmAlertShowText = text;
      this.confirmAlertShowType = type;

      return new Promise((resolve) => {
        this.confirmCallback = (confirmed: boolean) => {
          resolve(confirmed);
        };
      });
    },
    closeConfirm(confirmed: boolean) {
      if (this.confirmCallback) {
        this.confirmCallback(confirmed);
        this.confirmCallback = null;
      }

      this.confirmAlertShow = false;
      this.confirmAlertShowTitle = "";
      this.confirmAlertShowText = "";
      this.confirmAlertShowType = "";
    },
  },
});
