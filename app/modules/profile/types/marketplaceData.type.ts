export interface IMarketplaceDataMarket {
	name: string;
	sold: number;
	spending: number;
	totalProfit: number;
}

export interface IMarketplaceData {
	success: string;
	data: Record<string, IMarketplaceDataMarket>;
	totalProfit: number;
	totalSold: number;
	totalSpending: number;
}
