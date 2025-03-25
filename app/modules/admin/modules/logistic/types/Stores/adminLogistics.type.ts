import type { ILogistics } from "../Logistics/logisticsDatat.type";

export interface IAdminLogisticsStore {
  activeOpenEditTableTab: number | null;
  logisticsData: ILogistics[] | null;
  addCityModal: boolean;
  showSelectMenuAddCityModal: boolean;
  selectedCityAddCityModal: null | number;
  citiesAddCityModal: any;
  addProductModal: boolean;
  showSelectMenuProductModal: boolean;
  showSelectMenuWeightModal: boolean;
  selectedItemProductModal: null | number;
  productsProductModal: any;
}
