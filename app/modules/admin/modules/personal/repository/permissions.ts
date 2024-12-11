import type { IPermissions } from "~/modules/admin/modules/personal/types/Personal/Roles/permissions.type";

export class PermissionsRep {
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

  async getPermissions(
    params?: Record<string, any>,
    headers?: Record<string, string>
  ): Promise<IPermissions> {
    const config = useRuntimeConfig();
    const authToken = process.client ? localStorage.getItem("authToken") : "";
    return await this.request<IPermissions>(
      "GET",
      `${config.public.apiBaseUrl}/api/permissions`,
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
