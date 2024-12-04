import type {
  TPagination,
  TUser,
  TUserID,
} from "../Personal/Employees/users.type";
import type { IPermissions } from "../Personal/Roles/permissions.type";
import type {
  ISalesAgents,
  TSalesAgent,
} from "../Personal/SalesAgents/salesAgents.type";

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
  permissions: IPermissions | null;
  salesAgents: Record<number, TSalesAgent> | null;
  salesAgent: TSalesAgent | null;
  salesAgentsPagination: TPagination | null;
  salesAgentsPage: number;
  salesAgentsPerPage: number;
}
