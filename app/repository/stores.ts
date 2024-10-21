import type { IStore } from "~/modules/profile/types/stores.type";

export class StoresRep {
  private async request<T>(
    method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
    url: string,
    options?: Record<string, any>
  ): Promise<T> {
    return await $fetch<T>(url, {
      method,
      ...options,
    });
  }

  async getStores(
    params?: Record<string, any>,
    headers?: Record<string, string>
  ): Promise<IStore[]> {
    const authToken = process.client ? localStorage.getItem("authToken") : "";
    return await this.request<IStore[]>("GET", "/api/stores", {
      params: {
        ...params,
      },
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
        ...headers,
      },
    });
  }
}
