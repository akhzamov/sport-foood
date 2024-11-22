import { defineStore } from "pinia";
import type { IAdminStore } from "~/modules/admin/types/Stores/admin.type";

export const useAdminStore = defineStore("admin", {
  state: (): IAdminStore => ({
    activeOpenTabs: [],
    activeOpenTab: "",
    activeOpenEditTableTab: "",
    openUser: null,
    employees: null,
    employeesPagination: null,
    employeesPage: 1,
    employeesPerPage: 20,
    employee: null,
    permissions: null,
  }),
  actions: {},
});
