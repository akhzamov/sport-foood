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

export type TIndexAgent = {
  id: number;
  name: string;
  has_warning: boolean;
  store_weight: number;
  store_amount: number;
  hand_weight: number;
  hand_amount?: number;
};

export interface IIndexAgents {
  success: boolean;
  data: {
    agents: Record<number, TIndexAgent>;
  };
}

export type TIndexStorage = {
  id: number;
  name: string;
  has_warning: boolean;
  weight: number;
  amount: number;
};

export interface IIndexStorages {
  success: boolean;
  data: {
    products: Record<number, TIndexStorage>;
  };
}
