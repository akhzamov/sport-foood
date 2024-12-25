import { defineStore } from "pinia";
import type { IPersonalStore } from "../types/Stores/personalStore.type";

export const usePersonalStore = defineStore("personal", {
  state: (): IPersonalStore => ({
    employees: null,
    employeesPagination: null,
    employeesPage: 1,
    employeesPerPage: 15,
    employee: null,
    permissions: null,
    salesAgents: null,
    salesAgent: null,
    salesAgentsPagination: null,
    salesAgentsPage: 1,
    salesAgentsPerPage: 15,
    drivers: null,
    driver: null,
    driverAreas: null,
    driversPagination: null,
    driversPage: 1,
    driversPerPage: 15,
  }),
  actions: {},
});
