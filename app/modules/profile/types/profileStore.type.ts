import type { ISalesPlanMonth } from "~/modules/profile/types/salesPlan.type";
import type { IStore } from "~/modules/profile/types/stores.type";
import type { ISalesPlanDay } from "~/modules/profile/types/salesPlanDay.type";

interface IDaySalesProducts {
	product: string;
	quantity: number;
	totalPrice: number;
}

export interface IDaySales {
	total: number;
	totalPrice: number;
	products: IDaySalesProducts[];
}

export interface IProfileStore {
	activeTab: null | number;
	activeDayFilter: null | number;
	activeDayFilterBlocked: boolean;
	activeStoresSelect: boolean;
	monthAnnotation: number;
	activeMoreInfo: boolean;
	stores: IStore[] | null;
	selectedBranch: number | null;
	salesPlan: ISalesPlanMonth | null;
	chartLoader: boolean;
	selectedDate: string;
	salesPlanDay: ISalesPlanDay | null;
	salesPlanDayFirstRes: boolean;
}
