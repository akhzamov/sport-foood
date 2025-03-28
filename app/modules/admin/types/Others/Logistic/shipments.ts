import type { TPagination } from "~/types/pagination.type";

export type TShipment = {
  id: number;
  supplier_name: string;
  driver_name: string;
  start_date: string;
  status: string;
  cities: { id: number; name: string }[];
};

type TShipmentGetPointProduct = {
  id: number;
  name: string;
  quantity: number;
  kg_price: number;
  package_id: number;
  product_id: number;
  package: {
    id: number;
    unit: string;
    value: number;
  };
};

export type TShipmentGetPoint = {
  id: number;
  city_id: number;
  name: string;
  point_products: Record<number, TShipmentGetPointProduct>;
};

export interface IShipmentGet {
  id: number;
  supplier_id: number;
  arrived_at: string;
  driver_id: number;
  amount: number;
  driver_amount: number;
  additional: string;
  status: string;
  supplier: {
    id: number;
    name: string;
  };
  driver: { id: number; name: string };
  images: {
    id: number;
    path: string;
  }[];
  points: Record<number, TShipmentGetPoint>;
}

export interface IShipmentsResponse {
  success: boolean;
  data: Record<number, TShipment>;
  pagination: TPagination;
}

export interface IShipmentPackage {
  id: number;
  value: string;
  unit: string;
}

export interface IShipmentPackageGroup {
  id: number;
  value: string;
  packages: IShipmentPackage[];
}

export interface IShipmentGetResponse {
  data: { packages: IShipmentPackage[]; shipment?: IShipmentGet };
  success: boolean;
}

export type TShipmentEdit = {
  id: number;
  supplier_id: string;
  arrived_at: Date;
  driver_id: string;
  amount: string;
  driver_amount: string;
  additional: null | string;
  status: string;
  supplier: {
    id: number;
    name: string;
  };
  driver: {
    id: number;
    name: string;
  };
  images: { id: number; path: string }[];
  points: Record<number, TShipmentGetPoint>;
};

export interface IShipmentEditResponse {
  success: boolean;
  data: TShipmentEdit;
  message?: string;
  errors?: {
    [ket: string]: string[];
  };
}
export interface IShipmentDeleteResponse {
  success: boolean;
  message: string;
}
