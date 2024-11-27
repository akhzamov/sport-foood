type TIndexMarketplacesProduct = {
  product_id: number;
  product_name: string;
  weight: number;
  amount: number;
  min_limit: number;
  max_limit: number;
};

export type TIndexMarketplacesMarket = {
  id: number;
  name: string;
  weight: number;
  amount: number;
  has_warning: boolean;
  products?: Record<number, TIndexMarketplacesProduct>;
};

export interface IIndexMarketplaces {
  success: boolean;
  data: {
    marketplaces: Record<number, TIndexMarketplacesMarket>;
  };
}
