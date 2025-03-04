export type TProduct = {
  id: number;
  name: string;
  image: string;
};

export interface IProductResponse {
  success: boolean;
  data: {
    products: TProduct[];
  };
}

export type TProductId = {
  id: number;
  name: string;
  description: string;
  image: string;
};

export interface IProductByIdResponse {
  success: boolean;
  data: TProductId;
}

export interface IProductCreateResponse {
  success: boolean;
  message: string;
  data: TProductId;
}

export interface IProductCreateErrorResponse {
  message: string;
  errors: {
    [key: string]: string[];
  };
}

export interface IDeleteProductResponse {
  success: boolean;
  message: string;
}