import type { IStoragesLeft } from "~/modules/profile/types/Warehouse/storagesLeft.type";

export class StoragesLeftRep {
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

  async getStoragesLeft(
    params?: Record<string, any>,
    headers?: Record<string, string>
  ): Promise<IStoragesLeft> {
    const config = useRuntimeConfig();
    const authToken = process.client ? localStorage.getItem("authToken") : "";
    return await this.request<IStoragesLeft>(
      "GET",
      `${config.public.apiBaseUrl}/api/storages-left`,
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
