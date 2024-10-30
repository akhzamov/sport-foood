import type { ILogistics } from "../Logistics/logisticsDatat.type";

interface IAdminLogisticsTab {
  id: string;
  name: string;
}

export interface IAdminLogisticsStore {
  activeOpenTabs: IAdminLogisticsTab[];
  activeOpenTab: string | undefined;
  activeOpenEditTableTab: string;
  logisticsData: ILogistics[] | null;
}
