import type { IIndexMarketplaces } from "./../types/Dashboard/indexMarketplaceLeft.type";

export class IndexMarketplacesRep {
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

  async getIndexMarketplaces(
    params?: Record<string, any>,
    headers?: Record<string, string>
  ): Promise<IIndexMarketplaces> {
    const config = useRuntimeConfig();
    const authToken = process.client ? localStorage.getItem("authToken") : "";
    return await this.request<IIndexMarketplaces>(
      "GET",
      `${config.public.apiBaseUrl}/api/index-marketplace-left`,
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
