import type {
  ICreateDistrictsErrorResponse,
  ICreateDistrictsResponse,
  IDeleteDistrictsErrorResponse,
  IDeleteDistrictsResponse,
  IDistrictByIdResponse,
  IDistrictsResponse,
} from "../types/Others/Settings/Districts/districts.type";

export class DistrictsRep {
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

  async getDistricts(
    params?: Record<string, any>,
    headers?: Record<string, string>
  ): Promise<IDistrictsResponse> {
    const config = useRuntimeConfig();
    const authToken = process.client ? localStorage.getItem("authToken") : "";
    return await this.request<IDistrictsResponse>(
      "GET",
      `${config.public.apiBaseUrl}/api/crud/districts`,
      {
        params: {
          ...params,
        },
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
          "Accept": "application/json",
          ...headers,
        },
      }
    );
  }

  async getDistrictById(
    id: number,
    params?: Record<string, any>,
    headers?: Record<string, string>
  ): Promise<IDistrictByIdResponse> {
    const config = useRuntimeConfig();
    const authToken = process.client ? localStorage.getItem("authToken") : "";
    return await this.request<IDistrictByIdResponse>(
      "GET",
      `${config.public.apiBaseUrl}/api/crud/districts/${id}/get`,
      {
        params: {
          ...params,
        },
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
          "Accept": "application/json",
          ...headers,
        },
      }
    );
  }

  async createDistrictById(
    body: Record<string, any>,
    params?: Record<string, any>,
    headers?: Record<string, string>
  ): Promise<ICreateDistrictsResponse | ICreateDistrictsErrorResponse> {
    const config = useRuntimeConfig();
    const authToken = process.client ? localStorage.getItem("authToken") : "";
    try {
      const response = await this.request<ICreateDistrictsResponse>(
        "POST",
        `${config.public.apiBaseUrl}/api/crud/districts/create`,
        {
          params: { ...params },
          body: { ...body },
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
            "Accept": "application/json",
            ...headers,
          },
        }
      );
      return response;
    } catch (error: any) {
      return error.response?.data as ICreateDistrictsErrorResponse;
    }
  }

  async editDistrictById(
    id: number,
    body: Record<string, any>,
    params?: Record<string, any>,
    headers?: Record<string, string>
  ): Promise<ICreateDistrictsResponse | ICreateDistrictsErrorResponse> {
    const config = useRuntimeConfig();
    const authToken = process.client ? localStorage.getItem("authToken") : "";
    try {
      const response = await this.request<ICreateDistrictsResponse>(
        "POST",
        `${config.public.apiBaseUrl}/api/crud/districts/${id}/update`,
        {
          params: { ...params },
          body: { ...body },
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
            "Accept": "application/json",
            ...headers,
          },
        }
      );
      return response;
    } catch (error: any) {
      return error.response?.data as ICreateDistrictsErrorResponse;
    }
  }

  async deleteDistrictById(
    id: number,
    headers?: Record<string, string>
  ): Promise<IDeleteDistrictsResponse | IDeleteDistrictsErrorResponse> {
    const config = useRuntimeConfig();
    const authToken = process.client ? localStorage.getItem("authToken") : "";
    try {
      const response = await this.request<IDeleteDistrictsResponse>(
        "DELETE",
        `${config.public.apiBaseUrl}/api/crud/districts/${id}/delete`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
            "Accept": "application/json",
            ...headers,
          },
        }
      );
      return response;
    } catch (error: any) {
      return error.response?.data as IDeleteDistrictsErrorResponse;
    }
  }
}
