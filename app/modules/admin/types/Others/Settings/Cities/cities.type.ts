import type { TPagination } from "~/types/pagination.type";

export type TCity = {
  id: number;
  name: string;
  country_id: number;
  area_id: number;
  country: {
    id: number;
    name: string;
  };
  area: {
    id: number;
    name: string;
  };
};

export type TCityCreate = {
  id: number;
  name: string;
  area_id: number;
  area: {
    id: number;
    name: string;
  };
};

export interface ICitiesResponse {
  success: boolean;
  data: {
    cities: TCity[];
  };
  pagination: TPagination;
}

export interface ICityByIdResponse {
  success: boolean;
  data: TCityCreate;
}

export interface ICreateCityResponse {
  success: boolean;
  message: string;
  data: TCityCreate;
}

export interface ICreateCityErrorResponse {
  message: string;
  errors: {
    [ket: string]: string[];
  };
}

export interface IDeleteCityResponse {
  success: boolean;
  message: string;
}

export interface IDeleteCityErrorResponse {
  message: string;
  errors: {
    [ket: string]: string[];
  };
}
