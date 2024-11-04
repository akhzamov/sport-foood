import type { IMarketplaceLeft } from "~/modules/profile/types/Warehouse/marketplaceLeft.type";

export class MarketplaceLeftRep {
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

  async getMarketplaceLeft(
    params?: Record<string, any>,
    headers?: Record<string, string>
  ): Promise<IMarketplaceLeft> {
    const authToken = process.client ? localStorage.getItem("authToken") : "";
    return await this.request<IMarketplaceLeft>(
      "GET",
      "/api/marketplace-left",
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
