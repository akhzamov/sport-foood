
interface IDaySalesProducts {
    product: string,
    quantity: number
}

export interface IDaySales {
    total: number,
    products: IDaySalesProducts[]
}

export interface IProfileStore {
    activeTab: null | number,
    activeDayFilter: null | number,
    activeDayFilterBlocked: boolean,
    daySales: IDaySales[] | []
}