type TMarketplaceLEftProductMarketplaceCityDistrict = {
  district_id: number;
  district_name: string;
  left_weight: number;
};

type TMarketplaceLEftProductMarketplaceCity = {
  city_id: number;
  city_name: string;
  districts: Record<string, TMarketplaceLEftProductMarketplaceCityDistrict>;
};

export type TMarketplaceLEftProductMarketplace = {
  marketplace_id: number;
  marketplace_name: string;
  left_weight: number;
  min: number;
  max: number;
  cities: Record<string, TMarketplaceLEftProductMarketplaceCity>;
};

type TMarketplaceLeftProduct = {
  product_id: number;
  product_name: string;
  marketplaces: Record<string, TMarketplaceLEftProductMarketplace>;
};

export type TMarketplaceLeftRoundMarketplace = {
  marketplace_id: number;
  marketplace_name: string;
  left_weight: number;
};

export type TMarketplaceLeftArea = {
  id: number;
  name: string;
  round_marketplaces: Record<string, TMarketplaceLeftRoundMarketplace>;
  products: Record<string, TMarketplaceLeftProduct>;
};

export interface IMarketplaceLeft {
  success: boolean;
  data: {
    areas: Record<string, TMarketplaceLeftArea>;
  };
}
