import { defineStore } from "pinia";
import type { IMainStore } from "~/types/mainStore.type";

export const useMainStore = defineStore('main', {
    state: (): IMainStore => ({
        user: null,
        marketplaces: null,
        marketplaceById: null
    }),
    actions: {
    },
})