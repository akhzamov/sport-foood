export interface ILogisticsCity {
  id: number;
  name: string;
}

interface ILogisticsProductCityProduct {
  checked: boolean;
  name: string;
  weight: number;
  count: number;
  price: number;
}

interface ILogisticsProduct {
  [key: string]: ILogisticsProductCityProduct[];
}

export interface ILogistics {
  id: string;
  checked: boolean;
  supplier: string;
  driver: string;
  departureDate: string;
  deliveryPoint: string;
  status: string;
  orderCost: number;
  tripCost: number;
  comment: string;
  images: Record<string, string> | null;
  products: ILogisticsProduct;
}
