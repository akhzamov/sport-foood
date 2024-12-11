import type { IUser } from "~/types/user.type";
import type { IMarketplace } from "~/types/marketplaces.type";

export interface IMainStore {
  user: IUser | null;
  marketplaces: IMarketplace[] | null;
  marketplaceById: IMarketplace | null;
  errorMessage: string;
  alertShow: boolean;
  alertShowType: string;
  alertShowTitle: string;
  alertShowText: string;
  confirmModal: boolean;
  confirmModalTitle: string;
  confirmModalText: string;
  isLoading: boolean;
}
