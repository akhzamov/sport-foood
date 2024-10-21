export interface ITradingFloorMarketplace {
	id: number;
	type: string;
	totalWeight: number;
}

export interface ITradingFloorProductMarketplace {
	id: number;
	type: string;
	minWeight: number;
	maxWeight: number;
	weight: number;
}

export interface ITradingFloorProduct {
	id: number;
	marketplaces: Record<string, ITradingFloorProductMarketplace>;
}

export interface ITradingFloor {
	marketplaces: Record<string, ITradingFloorMarketplace>;
	products: Record<string, ITradingFloorProduct>;
}
