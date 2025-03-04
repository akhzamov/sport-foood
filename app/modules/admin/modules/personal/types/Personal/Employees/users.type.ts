import type { TPagination } from "~/types/pagination.type";

type TUserStore = {
  id: number;
  name: string;
};

export type TUser = {
  id: number;
  username: string;
  role: string;
  status: string;
  contact: string | null;
  stores: TUserStore[];
};

export type TUserID = {
  id: number;
  username: string;
  role: string;
  status: string;
  contact: string | null;
  stores: TUserStore[];
  permissions: string[];
};

export interface IUsers {
  success: boolean;
  data: TUser[];
  pagination: TPagination;
}

export interface IUser {
  success: boolean;
  message: string;
  errors?: {
    [key: string]: string[];
  };
  data?: TUserID;
}
