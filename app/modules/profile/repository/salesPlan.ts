import type { ISalesPlan } from "~/modules/profile/types/salesPlan.type";

export class SalesPlanRep {
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

  async getPlan(
    params?: Record<string, any>,
    headers?: Record<string, string>
  ): Promise<ISalesPlan> {
    const config = useRuntimeConfig();
    const authToken = process.client ? localStorage.getItem("authToken") : "";
    return await this.request<ISalesPlan>(
      "GET",
      `${config.public.apiBaseUrl}/api/sales-plan`,
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
