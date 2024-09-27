export interface ISalesPlanProducts {
	product: string;
	quantity: number;
	price: number;
	weight: number;
}

export interface ISalesPlanDays {
	total: number;
	totalPrice: number;
	totalWeight: number;
	products: ISalesPlanProducts[];
}

export interface ISalesPlanMonth {
	total: number;
	totalPrice: number;
	totalWeight: number;
	days: Record<string, ISalesPlanDays | null>;
}

export interface ISalesPlan {
	salesPlan: number;
	data: ISalesPlanMonth;
}
