import type {
  TPagination,
  TUser,
  TUserID,
} from "../Personal/Employees/users.type";
import type { IPermissions } from "../Personal/Roles/permissions.type";

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
}
