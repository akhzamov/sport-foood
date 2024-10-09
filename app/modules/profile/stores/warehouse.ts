import { defineStore } from "pinia";
import type { IWarehouseStore } from "~/modules/profile/types/warehouseStore.type";

export const useWarehouseStore = defineStore("warehouse", {
	state: (): IWarehouseStore => ({}),
	actions: {},
});
