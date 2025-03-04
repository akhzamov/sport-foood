import type { TPagination } from "~/types/pagination.type";

export type TDistrict = {
  id: number;
  name: string;
  country_id: number;
  area_id: number;
  city_id: number;
  country: {
    id: number;
    name: string;
  };
  area: {
    id: number;
    name: string;
  };
  city: {
    id: number;
    name: string;
  };
};

export type TDistrictCreate = {
  id: number;
  name: string;
  city_id: number;
  area_id: number;
  city: {
    id: number;
    name: string;
  };
  area: {
    id: number;
    name: string;
  };
};

export interface IDistrictsResponse {
  success: boolean;
  data: {
    districts: TDistrict[];
  };
  pagination: TPagination;
}

export interface ICreateDistrictsResponse {
  success: boolean;
  message: string;
  data: TDistrictCreate;
}
export interface IDistrictByIdResponse {
  success: boolean;
  data: TDistrictCreate;
}

export interface ICreateDistrictsErrorResponse {
  message: string;
  errors: {
    [ket: string]: string[];
  };
}

export interface IDeleteDistrictsResponse {
  success: boolean;
  message: string;
}

export interface IDeleteDistrictsErrorResponse {
  message: string;
  errors: {
    [ket: string]: string[];
  };
}
