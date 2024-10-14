export interface tradingFloorMarketplace {
	id: number;
	type: string;
	totalWeight: number;
}

export interface tradingFloorProductMarketplace {
	id: number;
	type: string;
	minWeight: number;
	maxWeight: number;
	weight: number;
}

export interface tradingFloorProduct {
	id: number;
	marketplaces: Record<string, tradingFloorProductMarketplace>;
}

export interface tradingFloor {
	marketplaces: Record<string, tradingFloorMarketplace>;
	products: Record<string, tradingFloorProduct>;
}
