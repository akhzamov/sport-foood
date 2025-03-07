export type TCrudStore = {
  id: number;
  name: string;
  sort: number;
  count: number;
  amount: number;
  photo: string;
};

export interface ICrudStoreResponse {
  success: boolean;
  data: {
    stores: TCrudStore[];
  };
}

export type TCrudStoreProduct = {
  store_id: number;
  product_id: number;
  name: string;
};
export type TCrudStoreCities = {
  store_id: number;
  city_id: number;
  name: string;
};

export type TCrudStoreId = {
  id: number;
  name: string;
  sort: number;
  count: number;
  amount: number;
  photo: string;
  sync_id: number;
  products: TCrudStoreProduct[];
  cities: TCrudStoreCities[];
};

export interface ICrudStoreIdResponse {
  success: boolean;
  data: TCrudStoreId;
}

export type TCrudStoreCreate = {
  id: number;
  name: string;
  sort: string;
  photo: string;
  sync_store_id: number | null;
  products: TCrudStoreProduct[];
  cities: TCrudStoreCities[];
};

export interface ICrudStoreCreateResponse {
  success: boolean;
  data: TCrudStoreCreate;
}

export interface ICrudStoreIdErrorResponse {
  message: string;
  errors: {
    [ket: string]: string;
  };
}

export interface ICrudStoreDeleteResponse {
  success: boolean;
  message: string;
}
