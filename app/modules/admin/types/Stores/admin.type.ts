import type {
  IDriverAreas,
  TDriver,
  TDriverArea,
} from "../../modules/personal/types/Personal/Drivers/drivers.type";
import type {
  TUser,
  TUserID,
} from "../../modules/personal/types/Personal/Employees/users.type";
import type {
  IPermissions,
  TPermissions,
} from "../../modules/personal/types/Personal/Roles/permissions.type";
import type {
  ISalesAgents,
  TSalesAgent,
} from "../../modules/personal/types/Personal/SalesAgents/salesAgents.type";
import type { TPagination } from "../Others/pagination.type";

interface IAdminLogisticsTab {
  id: string;
  title: string;
  name: string;
}

export interface IAdminStore {
  activeOpenTabs: IAdminLogisticsTab[];
  activeOpenTab: string | undefined;
  activeOpenEditTableTab: string;
  openUser: number | null;
  employees: TUser[] | null;
  employeesPagination: TPagination | null;
  employeesPage: number;
  employeesPerPage: number;
  employee: TUserID | null;
  permissions: TPermissions | null;
  salesAgents: Record<number, TSalesAgent> | null;
  salesAgent: TSalesAgent | null;
  salesAgentsPagination: TPagination | null;
  salesAgentsPage: number;
  salesAgentsPerPage: number;
  drivers: Record<string, TDriver> | null;
  driver: TDriver | null;
  driverAreas: Record<number, TDriverArea> | null;
  driversPagination: TPagination | null;
  driversPage: number;
  driversPerPage: number;
}
