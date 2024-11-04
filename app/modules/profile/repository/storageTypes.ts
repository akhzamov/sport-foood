import type { IStorageTypes } from "~/modules/profile/types/Warehouse/storageTypes.type";

export class StorageTypesRep {
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

  async getStorageTypes(
    params?: Record<string, any>,
    headers?: Record<string, string>
  ): Promise<IStorageTypes> {
    const authToken = process.client ? localStorage.getItem("authToken") : "";
    return await this.request<IStorageTypes>("GET", "/api/storage-types", {
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
