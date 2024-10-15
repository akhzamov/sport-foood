import type { tradingFloor } from "~/modules/profile/types/tradingFloorBalance.type";
import type { ISalesAgents } from "~/modules/profile/types/salesAgentsBalance.type";

export interface IWarehouseStore {
	tradingFloorData: tradingFloor | null;
	salesAgentsData: Record<string, ISalesAgents> | null;
}
