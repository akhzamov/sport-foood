import type { TPagination } from "~/types/pagination.type";
import type {
  IShipmentGet,
  IShipmentPackageGroup,
  TShipment,
} from "../Others/Logistic/shipments";
import type { IPointSchemaFormLogistic } from "../../modules/logistic/types/Logistics/schemaForm.type";

export interface ILogisticStore {
  shipments: TShipment[] | null;
  shipment: IShipmentGet | null;
  shipmentPackages: IShipmentPackageGroup[] | null;
  shipmentArrPoints: IPointSchemaFormLogistic[] | null;
  shipmentsPagination: TPagination | null;
  shipmentsPage: Ref<number>;
  perPage: number;
  addCityModal: boolean;
  addProductModal: boolean;
}
