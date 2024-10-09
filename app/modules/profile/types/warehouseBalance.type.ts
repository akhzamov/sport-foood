interface IWarehouseBalanceProducts {
	id: number;
}

interface IWarehouseBalanceCitiesProducts {
	id: number;
	minWeight: number;
	maxWeight: number;
	weight: number;
}

interface IWarehouseBalanceCities {
	products: Record<string, IWarehouseBalanceCitiesProducts>;
}

export interface IWarehouseBalance {
	products: Record<string, IWarehouseBalanceProducts>;
	cities: Record<string, IWarehouseBalanceCities>;
}
