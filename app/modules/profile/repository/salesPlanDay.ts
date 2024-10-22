import type { ISalesPlanDay } from "~/modules/profile/types/Dashboard/salesPlanDay.type";

export class SalesPlanDayRep {
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

  async getSalesPlanDay(
    params?: Record<string, any>,
    headers?: Record<string, string>
  ): Promise<ISalesPlanDay> {
    const authToken = process.client ? localStorage.getItem("authToken") : "";
    return await this.request<ISalesPlanDay>(
      "GET",
      "/api/sales-plan/day/detail",
      {
        params: {
          ...params,
        },
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
          ...headers,
        },
      }
    );
  }
}
