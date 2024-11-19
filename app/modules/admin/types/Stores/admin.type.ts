interface IAdminLogisticsTab {
  id: string;
  title: string;
  name: string;
}

export interface IAdminStore {
  activeOpenTabs: IAdminLogisticsTab[];
  activeOpenTab: string | undefined;
  activeOpenAddTab: string | undefined;
  activeOpenEditTableTab: string;
}
