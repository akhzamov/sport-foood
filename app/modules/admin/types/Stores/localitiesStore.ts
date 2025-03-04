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

export interface ILocalitiesStore {
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
  perPage: number;
}
