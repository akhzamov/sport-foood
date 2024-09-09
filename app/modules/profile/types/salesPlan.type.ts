export interface ISalesPlanProducts {
    product: string,
    quantity: number,
    price: number
}

export interface ISalesPlanDays {
    total: number;
    totalPrice: number;
    products: ISalesPlanProducts[];
};

export interface ISalesPlanMonth {
    total: number,
    totalPrice: number,
    days: Record<string, ISalesPlanDays | null>
}

export interface ISalesPlan {
    salesPlan: number,
    data: ISalesPlanMonth,
}