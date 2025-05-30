import type { ISalesPlanMonth } from "~/modules/profile/types/salesPlan.type";
import type { ISalesPlanDayData } from "~/modules/profile/types/Dashboard/salesPlanDay.type";
import type { IMarketplaceDataMarket } from "~/modules/profile/types/Dashboard/marketplaceData.type";
import type {
  TIndexAgent,
  TIndexMarketplacesMarket,
  TIndexStorage,
} from "./Dashboard/indexBalance.type";
import type { TPurchase } from "./Dashboard/purchases.type";
import type { TSalesPlanSpendingType } from "./Dashboard/salesPlanSpending";

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
  activeDayFilterValue: null | { date_from: string; date_to: string };
  activeDayFilterBlocked: boolean;
  activeStoresSelect: boolean;
  monthAnnotation: number;
  activeMoreInfo: boolean;
  selectedBranch: number;
  salesPlan: ISalesPlanMonth | null;
  chartLoader: boolean;
  selectedDate: string;
  selectedDateRU: string;
  salesPlanDay: Record<string, ISalesPlanDayData> | null;
  salesPlanDayFirstRes: boolean;
  reportGraphStoreSelect: boolean;
  reportGraphAddSettingModal: boolean;
  reportGraphAddSettingSelectUser: boolean;
  marketplacesData: Record<string, IMarketplaceDataMarket> | null;
  marketplacesTotalProfit: number;
  marketplacesTotalSold: number;
  marketplacesTotalSpending: number;
  indexMarketplacesLeft: Record<number, TIndexMarketplacesMarket> | null;
  indexAgentsLeft: Record<number, TIndexAgent> | null;
  indexStoragesLeft: Record<number, TIndexStorage> | null;
  purchases: Record<number, TPurchase> | null;
  spending: Record<string, TSalesPlanSpendingType> | null;
  spendingTotalAmount: number | null;
}
