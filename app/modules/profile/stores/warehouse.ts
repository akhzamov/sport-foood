import { defineStore } from "pinia";
import { tradingFloorData } from "~/modules/profile/components/Warehouse/TradingFloor/tradingFloorBalance.data";
import { salesAgentsData } from "~/modules/profile/components/Warehouse/SalesAgents/salesAgentsBalance.data";
import type { IWarehouseStore } from "~/modules/profile/types/Warehouse/store.type";

export const useWarehouseStore = defineStore("warehouse", {
	state: (): IWarehouseStore => ({
		tradingFloorData: tradingFloorData,
		salesAgentsData: salesAgentsData,
	}),
	actions: {},
});
