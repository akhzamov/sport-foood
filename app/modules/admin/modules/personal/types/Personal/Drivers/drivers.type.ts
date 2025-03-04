import type { TPagination } from "~/types/pagination.type";

export type TDriver = {
  id: number;
  name: string;
  contact: string;
  status: string;
  city: TDriverAreaCity;
};

export interface IDriver {
  success: boolean;
  data: TDriver;
}

type TDriverAreaCity = {
  id: number;
  name: string;
};

export type TDriverArea = {
  id: number;
  name: string;
  cities: Record<number, TDriverAreaCity>;
};

export interface IDrivers {
  success: boolean;
  data: {
    drivers: Record<number, TDriver>;
  };
  pagination: TPagination;
}

export interface IDriverAreas {
  success: boolean;
  data: {
    areas: Record<number, TDriverArea>;
  };
}

export interface IDriverHandle {
  success?: boolean;
  message: string;
  errors?: {
    [key: string]: string[];
  };
  data?: TDriver;
}

export type TDriverRemove = {
  success: boolean;
  message: string;
};
