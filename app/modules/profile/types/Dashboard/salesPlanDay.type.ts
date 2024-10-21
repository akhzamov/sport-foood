export interface ISalesPlanDayPackages {
	packageWeight: number;
	count: number;
	weightTotal: number;
	amount: number;
}

export interface ISalesPlanDayProducts {
	id: number;
	name: string;
	plan: number;
	soldCount: number;
	soldWeight: number;
	packages: Record<string, ISalesPlanDayPackages>;
}

export interface ISalesPlanDayData {
	id: number;
	name: string;
	type: string;
	products: Record<string, ISalesPlanDayProducts>;
	totalSum: number;
	totalWight: number;
	totalCount: number;
}

export interface ISalesPlanDay {
	success: string;
	totalCount: number;
	data: Record<string, ISalesPlanDayData>;
}
