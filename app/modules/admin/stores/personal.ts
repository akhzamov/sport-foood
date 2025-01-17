import { defineStore } from "pinia";
import type { IPersonalStore } from "../types/Stores/personalStore.type";

export const usePersonalStore = defineStore("personal", {
  state: (): IPersonalStore => ({
    employees: null,
    employeesFiltered: null,
    isAscendingUsername: false,
    isAscendingStatus: false,
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
  actions: {
    nameFilter() {
      if (!this.employees) return;

      const sortedEmployees = [...this.employees].sort((a, b) => {
        const nameA = a.username.toLowerCase();
        const nameB = b.username.toLowerCase();

        // Сортировка по текущему порядку
        return this.isAscendingUsername
          ? nameA.localeCompare(nameB)
          : nameB.localeCompare(nameA);
      });

      this.employeesFiltered = sortedEmployees;

      // Переключаем порядок сортировки для следующего вызова
      this.isAscendingUsername = !this.isAscendingUsername;
    },
    statusFilter() {
      if (!this.employees) return;

      const sortedEmployees = [...this.employees].sort((a, b) => {
        const nameA = a.status.toLowerCase();
        const nameB = b.status.toLowerCase();

        // Сортировка по текущему порядку
        return this.isAscendingStatus
          ? nameA.localeCompare(nameB)
          : nameB.localeCompare(nameA);
      });

      this.employeesFiltered = sortedEmployees;

      // Переключаем порядок сортировки для следующего вызова
      this.isAscendingStatus = !this.isAscendingStatus;
    },
  },
});
