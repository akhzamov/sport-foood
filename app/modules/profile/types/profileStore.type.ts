import type { ISalesPlanMonth } from "~/modules/profile/types/salesPlan.type"
import type { IStore } from "~/modules/profile/types/stores.type"

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
    stores: IStore[] | null,
    selectedBranch: number | null,
    salesPlan: ISalesPlanMonth | null,
    chartLoader: boolean
}