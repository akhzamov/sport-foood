import type { TPagination } from "~/types/pagination.type";

export type TSupplier = {
  id: number;
  name: string;
};

export interface ISuppliersResponse {
  success: boolean;
  data: TSupplier[];
  pagination: TPagination;
}

export interface ISupplierByIdResponse {
  success: boolean;
  data: TSupplier;
}

export interface ISupplierCreateResponse {
  success: boolean;
  message: string;
  data: TSupplier;
}

export interface ISupplierCreateErrorResponse {
  message: string;
  errors: {
    [key: string]: string;
  };
}

export interface IDeleteSupplierResponse {
  success: boolean;
  message: string;
}
