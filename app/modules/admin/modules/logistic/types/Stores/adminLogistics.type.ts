import type { ILogistics } from "../Logistics/logisticsDatat.type";

export interface IAdminLogisticsStore {
  activeOpenEditTableTab: string;
  logisticsData: ILogistics[] | null;
  addCityModal: boolean;
  showSelectMenuAddCityModal: boolean;
  selectedCityAddCityModal: null | number;
  citiesAddCityModal: any;
  addProductModal: boolean;
  showSelectMenuProductModal: boolean;
  selectedItemProductModal: null | number;
  productsProductModal: any;
}
