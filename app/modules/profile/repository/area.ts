import type { ISalesPlan } from "~/modules/profile/types/salesPlan.type";
import type { IAreas } from "~/modules/profile/types/Warehouse/areas.type";

export class AreasRep {
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

  async getAreas(
    params?: Record<string, any>,
    headers?: Record<string, string>
  ): Promise<IAreas> {
    const config = useRuntimeConfig();
    const authToken = process.client ? localStorage.getItem("authToken") : "";
    return await this.request<IAreas>("GET", `${config.public.apiBaseUrl}/api/areas`, {
      params: {
        ...params,
      },
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Origin": window.location.origin,
        ...headers,
      },
    });
  }
}
