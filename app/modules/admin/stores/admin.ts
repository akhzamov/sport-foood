import { defineStore } from "pinia";
import type { IAdminStore } from "~/modules/admin/types/Stores/adminStore.type";

export const useAdminStore = defineStore("admin", {
  state: (): IAdminStore => ({
    activeOpenTabs: [],
    activeOpenTab: "",
    activeOpenEditTableTab: "",
    openUser: null,
  }),
  actions: {},
});
