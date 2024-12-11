import type { IDriver, IDriverAreas, IDriverHandle, IDrivers, TDriverRemove } from "../types/Personal/Drivers/drivers.type";

export class DriversRep {
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

  async getDrivers(
    params?: Record<string, any>,
    headers?: Record<string, string>
  ): Promise<IDrivers> {
    const config = useRuntimeConfig();
    const authToken = process.client ? localStorage.getItem("authToken") : "";
    return await this.request<IDrivers>(
      "GET",
      `${config.public.apiBaseUrl}/api/crud/drivers`,
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
  async getDriverAreas(
    params?: Record<string, any>,
    headers?: Record<string, string>
  ): Promise<IDriverAreas> {
    const config = useRuntimeConfig();
    const authToken = process.client ? localStorage.getItem("authToken") : "";
    return await this.request<IDriverAreas>(
      "GET",
      `${config.public.apiBaseUrl}/api/crud/driver/areas`,
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
  async getDriverById(
    id: number,
    params?: Record<string, any>,
    headers?: Record<string, string>
  ): Promise<IDriver> {
    const config = useRuntimeConfig();
    const authToken = process.client ? localStorage.getItem("authToken") : "";
    return await this.request<IDriver>(
      "GET",
      `${config.public.apiBaseUrl}/api/crud/drivers/${id}`,
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
  async editDriverById(
    id: number,
    body?: Record<string, any>,
    params?: Record<string, any>,
    headers?: Record<string, string>
  ): Promise<IDriverHandle> {
    const config = useRuntimeConfig();
    const authToken = process.client ? localStorage.getItem("authToken") : "";
    return await this.request<IDriverHandle>(
      "POST",
      `${config.public.apiBaseUrl}/api/crud/drivers/${id}/update`,
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
  async createDriver(
    body?: Record<string, any>,
    params?: Record<string, any>,
    headers?: Record<string, string>
  ): Promise<IDriverHandle> {
    const config = useRuntimeConfig();
    const authToken = process.client ? localStorage.getItem("authToken") : "";
    return await this.request<IDriverHandle>(
      "POST",
      `${config.public.apiBaseUrl}/api/crud/drivers/store`,
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
  async deleteDriverById(
    id: number,
    headers?: Record<string, string>
  ): Promise<TDriverRemove> {
    const config = useRuntimeConfig();
    const authToken = process.client ? localStorage.getItem("authToken") : "";
    return await this.request<TDriverRemove>(
      "DELETE",
      `${config.public.apiBaseUrl}/api/crud/drivers/${id}`,
      {
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
