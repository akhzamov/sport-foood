import type { ISalesPlanSpending } from "../types/Dashboard/salesPlanSpending";

export class SalesPlanSpendingRep {
  private async request<T>(
    method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
    url: string,
    options?: Record<string, any>
  ) {
    return await $fetch<T>(url, {
      method,
      ...options,
    });
  }

  async getSpending(
    params?: Record<string, any>,
    headers?: Record<string, string>
  ): Promise<ISalesPlanSpending> {
    const config = useRuntimeConfig();
    const authToken = process.client ? localStorage.getItem("authToken") : "";
    return await this.request<ISalesPlanSpending>(
      "GET",
      `${config.public.apiBaseUrl}/api/sales-plan/spendings`,
      {
        params: {
          ...params,
        },
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
          "Accept": "application/json",
          // "Origin": window.location.origin,
          ...headers,
        },
      }
    );
  }
}
