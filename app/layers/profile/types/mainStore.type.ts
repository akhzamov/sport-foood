
interface IDaySalesProducts {
    product: string,
    quantity: number,
    totalPrice: number
}

export interface IDaySales {
    total: number,
    totalPrice: number,
    products: IDaySalesProducts[]
}

export interface IProfileStore {
    activeTab: null | number,
    activeDayFilter: null | number,
    activeDayFilterBlocked: boolean,
    daySales: IDaySales[] | [],
    monthAnnotation: number,
    activeMoreInfo: boolean,
}