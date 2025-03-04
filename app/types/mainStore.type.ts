import type { IUser } from "~/types/user.type";
import type { IMarketplace } from "~/types/marketplaces.type";
import type { IStore } from "./stores.type";

export interface IMainStore {
  user: IUser | null;
  marketplaces: IMarketplace[] | null;
  marketplaceById: IMarketplace | null;
  errorMessage: string;
  alertShow: boolean;
  alertShowType: string;
  alertShowTitle: string;
  alertShowText: string;
  confirmAlertShow: boolean;
  confirmAlertShowType: string;
  confirmAlertShowTitle: string;
  confirmAlertShowText: string;
  confirmCallback: ((confirmed: boolean) => void) | null;
  rightAlertShow: boolean;
  rightAlertShowType: string;
  rightAlertShowText: string;
  confirmModal: boolean;
  confirmModalTitle: string;
  confirmModalText: string;
  isLoading: boolean;
  stores: IStore[] | null;
}
