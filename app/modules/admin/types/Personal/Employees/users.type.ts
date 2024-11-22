type TUserStore = {
  id: number;
  name: string;
};

export type TPagination = {
  current_page: number;
  per_page: number;
  total: number;
  last_page: number;
  next_page_url: string;
  prev_page_url: string;
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
  data: TUserID;
}
