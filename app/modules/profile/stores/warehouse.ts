import { defineStore } from "pinia";
import { tradingFloorData } from "~/modules/profile/components/Warehouse/Modules/TradingFloor/tradingFloorBalance.data";
import type { IWarehouseStore } from "~/modules/profile/types/warehouseStore.type";

export const useWarehouseStore = defineStore("warehouse", {
	state: (): IWarehouseStore => ({
		tradingFloorData: tradingFloorData,
	}),
	actions: {},
});
