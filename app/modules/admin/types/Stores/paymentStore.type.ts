import type { TPagination } from "~/types/pagination.type";
import type {
  TRequestPayment,
  TRequestType,
} from "../../modules/payment/types/Requests/paymentRequests.type";
import type { TDriverArea } from "../../modules/personal/types/Personal/Drivers/drivers.type";

export interface IPaymentStore {
  perPage: number;
  paymentRequestsPage: number;
  paymentRequestsPagination: TPagination | null;
  filteredStores: number[];
  filteredCities: number[];
  filteredStatus: string;
  filteredType: string;
  filteredPriority: string;
  filteredPaymentId: null | number;
  types: null | TRequestType[];
  statuses: null | TRequestType[];
  priorities: null | TRequestType[];
  areas: null | Record<number, TDriverArea>;
  payments: null | Record<number, TRequestPayment>;
  filterShow: boolean;
}
