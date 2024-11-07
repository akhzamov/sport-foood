import type { ISalesPlanMonth } from "~/modules/profile/types/salesPlan.type";
import type { ISalesPlanDay } from "~/modules/profile/types/Dashboard/salesPlanDay.type";
import type { IMarketplaceDataMarket } from "~/modules/profile/types/Dashboard/marketplaceData.type";

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
	selectedBranch: number;
	salesPlan: ISalesPlanMonth | null;
	chartLoader: boolean;
	selectedDate: string;
	selectedDateRU: string;
	salesPlanDay: ISalesPlanDay | null;
	salesPlanDayFirstRes: boolean;
	reportGraphStoreSelect: boolean;
	reportGraphAddSettingModal: boolean;
	reportGraphAddSettingSelectUser: boolean;
	marketplacesData: Record<string, IMarketplaceDataMarket> | null;
	marketplacesTotalProfit: number;
	marketplacesTotalSold: number;
	marketplacesTotalSpending: number;
}
