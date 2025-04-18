import type {
  TCity,
  TCityCreate,
} from "~/modules/admin/types/Others/Settings/Cities/cities.type";
import type { TAreas } from "~/modules/admin/types/Others/Settings/Cities/areas.type";
import type {
  TDistrict,
  TDistrictCreate,
} from "~/modules/admin/types/Others/Settings/Districts/districts.type";
import type { TPagination } from "~/types/pagination.type";
import type { TCitiesArea } from "../Others/Settings/Cities/citiesByArea.type";
import type {
  TProduct,
  TProductId,
} from "../Others/Settings/Products/products.type";
import type { TMarketplace } from "../Others/Settings/Marketplaces/marketplaces.type";
import type {
  TCrudStore,
  TCrudStoreId,
} from "../Others/Settings/Stores/stores.type";
import type { TSupplier } from "../Others/Settings/Suppliers/suppliers.type";
import type {
  TDriver,
  TDriverArea,
} from "../../modules/personal/types/Personal/Drivers/drivers.type";

interface IAdminLogisticsTab {
  id: string;
  title: string;
  name: string;
}

export interface IAdminStore {
  activeOpenTabs: IAdminLogisticsTab[];
  activeOpenTab: string | undefined;
  activeOpenEditTableTab: string;
  openUser: number | null;
  areas: TAreas[] | null;
  selectedArea: number | null;
  city: TCityCreate | null;
  cities: TCity[] | null;
  citiesPagination: TPagination | null;
  citiesPage: Ref<number>;
  citiesByArea: Record<number, TCitiesArea> | null;
  searchCities: Ref<string>;
  searchDistricts: Ref<string>;
  selectedCityByArea: number | null;
  districts: TDistrict[] | null;
  district: TDistrictCreate | null;
  districtsPagination: TPagination | null;
  districtsPage: Ref<number>;
  products: TProduct[] | null;
  product: TProductId | null;
  marketplaces: TMarketplace[] | null;
  marketplace: TMarketplace | null;
  newMarketplace: { name: string } | null;
  stores: TCrudStore[] | null;
  store: TCrudStoreId | null;
  suppliers: TSupplier[] | null;
  supplier: TSupplier | null;
  suppliersPage: Ref<number>;
  supplierPagination: TPagination | null;
  drivers: Record<string, TDriver> | null;
  driver: TDriver | null;
  driversPagination: TPagination | null;
  driversPage: Ref<number>;
  perPage: number;
}
