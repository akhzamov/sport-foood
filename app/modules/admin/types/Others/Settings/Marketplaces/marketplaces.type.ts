export type TMarketplace = {
  id: number;
  name: string;
};

export interface IMarketplaceResponse {
  success: boolean;
  data: TMarketplace[];
}

export interface IMarketplaceByIdResponse {
  success: boolean;
  data: TMarketplace;
}

export interface IMarketplaceByIdErrorResponse {
  message: string;
  errors: {
    [key: string]: string[];
  };
}

export interface IDeleteMarketplaceResponse {
  success: boolean;
  message: boolean;
}
