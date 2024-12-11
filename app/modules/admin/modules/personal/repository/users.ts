import type { IUsers, IUser } from "~/modules/admin/modules/personal/types/Personal/Employees/users.type";

export class UsersRep {
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

  async getUsers(
    params?: Record<string, any>,
    headers?: Record<string, string>
  ): Promise<IUsers> {
    const config = useRuntimeConfig();
    const authToken = process.client ? localStorage.getItem("authToken") : "";
    return await this.request<IUsers>(
      "GET",
      `${config.public.apiBaseUrl}/api/crud/users`,
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
  async getUserById(
    id: number,
    params?: Record<string, any>,
    headers?: Record<string, string>
  ): Promise<IUser> {
    const config = useRuntimeConfig();
    const authToken = process.client ? localStorage.getItem("authToken") : "";
    return await this.request<IUser>(
      "GET",
      `${config.public.apiBaseUrl}/api/crud/users/${id}`,
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
  async editUserById(
    id: number,
    body: Record<string, any>,
    params?: Record<string, any>,
    headers?: Record<string, string>
  ): Promise<IUser> {
    const config = useRuntimeConfig();
    const authToken = process.client ? localStorage.getItem("authToken") : "";
    return await this.request<IUser>(
      "POST",
      `${config.public.apiBaseUrl}/api/crud/users/${id}/update`,
      {
        params: {
          ...params,
        },
        body:{
          ...body
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
