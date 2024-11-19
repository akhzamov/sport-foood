import type { IMarketplaceData } from "~/modules/profile/types/Dashboard/marketplaceData.type";

export class SalesPlanMarketplaceRep {
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

  async getMarketplace(
    params?: Record<string, any>,
    headers?: Record<string, string>
  ): Promise<IMarketplaceData> {
    const config = useRuntimeConfig();
    const authToken = process.client ? localStorage.getItem("authToken") : "";
    return await this.request<IMarketplaceData>(
      "GET",
      `${config.public.apiBaseUrl}/api/sales-plan/marketplace`,
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
