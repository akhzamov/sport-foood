import type { tradingFloor } from "~/modules/profile/types/tradingFloorBalance.type";

export interface IWarehouseStore {
	tradingFloorData: tradingFloor | null;
}
