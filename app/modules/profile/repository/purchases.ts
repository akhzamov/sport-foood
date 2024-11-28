import type { IPurchases } from "~/modules/profile/types/Dashboard/purchases.type";
export class PurchasesRep {
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

  async getPurchases(
    params?: Record<string, any>,
    headers?: Record<string, string>
  ): Promise<IPurchases> {
    const config = useRuntimeConfig();
    const authToken = process.client ? localStorage.getItem("authToken") : "";
    return await this.request<IPurchases>(
      "GET",
      `${config.public.apiBaseUrl}/api/purchases`,
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
