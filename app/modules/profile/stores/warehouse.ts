import { defineStore } from "pinia";
import { tradingFloorData } from "~/modules/profile/components/Warehouse/Modules/TradingFloor/tradingFloorBalance.data";
import { salesAgentsData } from "~/modules/profile/components/Warehouse/Modules/SalesAgents/salesAgentsBalance.data";
import type { IWarehouseStore } from "~/modules/profile/types/warehouseStore.type";

export const useWarehouseStore = defineStore("warehouse", {
	state: (): IWarehouseStore => ({
		tradingFloorData: tradingFloorData,
		salesAgentsData: salesAgentsData,
	}),
	actions: {},
});
