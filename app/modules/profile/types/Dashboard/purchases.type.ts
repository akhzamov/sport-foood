type TPurchaseCity = {
  id: number;
  name: string;
  status: "Доставлен" | "В пути" | "Не полностью";
  arrived_at: string | null;
};

export type TPurchase = {
  id: number;
  supplier_name: string;
  driver_name: string;
  start_date: string;
  cities: Record<string, TPurchaseCity>;
};

export interface IPurchases {
  success: boolean;
  data: {
    purchases: Record<number, TPurchase>;
  };
}
