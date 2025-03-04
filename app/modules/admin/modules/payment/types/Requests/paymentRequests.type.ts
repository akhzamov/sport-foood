import type { TPagination } from "~/types/pagination.type";

export type TRequestType = {
  key: string;
  value: string;
};

export interface IPromiseRequestTypes {
  success: boolean;
  data: TRequestType[];
}

export interface IPromiseRequestStatuses {
  success: boolean;
  data: TRequestType[];
}

export interface IPromiseRequestPriorities {
  success: boolean;
  data: TRequestType[];
}

export type TRequestPayment = {
  id: number;
  store: {
    id: number;
    name: string;
  };
  type: string;
  city: {
    id: number | null;
    name: string | null;
  };
  receiver: string | null;
  amount: string;
  currency: string;
  created_at: string;
  status: string;
  priority: string;
};

export interface IPromiseRequestPayments {
  success: boolean;
  data: {
    payments: Record<string, TRequestPayment>;
    pagination: TPagination;
    waiting_payment_amount: number;
    waiting_payment_currency: string;
  };
}
