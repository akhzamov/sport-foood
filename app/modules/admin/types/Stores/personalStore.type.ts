import type { TPagination } from "~/types/pagination.type";
import type {
  TDriver,
  TDriverArea,
} from "../../modules/personal/types/Personal/Drivers/drivers.type";
import type {
  TUser,
  TUserID,
} from "../../modules/personal/types/Personal/Employees/users.type";
import type { TPermissions } from "../../modules/personal/types/Personal/Roles/permissions.type";
import type { TSalesAgent } from "../../modules/personal/types/Personal/SalesAgents/salesAgents.type";

export interface IPersonalStore {
  employees: TUser[] | null;
  employeesFiltered: TUser[] | null;
  isAscendingUsername: boolean;
  isAscendingStatus: boolean;
  employeesPagination: TPagination | null;
  employeesPage: Ref<number>;
  employeesPerPage: number;
  employee: TUserID | null;
  searchEmployee: string;
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
