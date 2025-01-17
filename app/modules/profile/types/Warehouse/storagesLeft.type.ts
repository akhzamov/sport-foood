export type TStoragesLeftProduct = {
  product_id: number;
  product_name: string;
  left: number;
  min_limit: number;
  max_limit: number;
};

export type TStoragesLeftCity = {
  id: number;
  name: string;
  products: Record<string, TStoragesLeftProduct>;
};

export interface IStoragesLeft {
  success: boolean;
  data: {
    storageCities: Record<string, TStoragesLeftCity>;
  };
}
