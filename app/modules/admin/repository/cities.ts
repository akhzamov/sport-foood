import type { IAreasResponse } from "~/modules/admin/types/Others/Settings/Cities/areas.type";
import type {
  ICitiesResponse,
  ICityByIdResponse,
  ICreateCityErrorResponse,
  ICreateCityResponse,
  IDeleteCityErrorResponse,
  IDeleteCityResponse,
} from "~/modules/admin/types/Others/Settings/Cities/cities.type";
import type { ICitiesByAreaResponse } from "../types/Others/Settings/Cities/citiesByArea.type";

export class CrudCitiesRep {
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

  async getAreas(params?: Record<string, any>, headers?: Record<string, string>): Promise<IAreasResponse> {
    const config = useRuntimeConfig();
    const authToken = process.client ? localStorage.getItem("authToken") : "";
    return await this.request<IAreasResponse>("GET", `${config.public.apiBaseUrl}/api/crud/cities/areas`, {
      params: {
        ...params,
      },
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
        "Accept": "application/json",
        ...headers,
      },
    });
  }

  async getCitiesByArea(
    params?: Record<string, any>,
    headers?: Record<string, string>
  ): Promise<ICitiesByAreaResponse> {
    const config = useRuntimeConfig();
    const authToken = process.client ? localStorage.getItem("authToken") : "";
    return await this.request<ICitiesByAreaResponse>(
      "GET",
      `${config.public.apiBaseUrl}/api/crud/districts/areas`,
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

  async getCities(params?: Record<string, any>, headers?: Record<string, string>): Promise<ICitiesResponse> {
    const config = useRuntimeConfig();
    const authToken = process.client ? localStorage.getItem("authToken") : "";
    return await this.request<ICitiesResponse>("GET", `${config.public.apiBaseUrl}/api/crud/cities`, {
      params: {
        ...params,
      },
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
        "Accept": "application/json",
        ...headers,
      },
    });
  }

  async getCityById(
    id: number,
    params?: Record<string, any>,
    headers?: Record<string, string>
  ): Promise<ICityByIdResponse> {
    const config = useRuntimeConfig();
    const authToken = process.client ? localStorage.getItem("authToken") : "";
    return await this.request<ICityByIdResponse>(
      "GET",
      `${config.public.apiBaseUrl}/api/crud/cities/${id}/get`,
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

  async createCityById(
    body: Record<string, any>,
    params?: Record<string, any>,
    headers?: Record<string, string>
  ): Promise<ICreateCityResponse> {
    const config = useRuntimeConfig();
    const authToken = process.client ? localStorage.getItem("authToken") : "";
    try {
      const response = await this.request<ICreateCityResponse>(
        "POST",
        `${config.public.apiBaseUrl}/api/crud/cities/create`,
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
      throw error.response?.data as ICreateCityErrorResponse;
    }
  }

  async editCityById(
    id: number,
    body: Record<string, any>,
    params?: Record<string, any>,
    headers?: Record<string, string>
  ): Promise<ICreateCityResponse> {
    const config = useRuntimeConfig();
    const authToken = process.client ? localStorage.getItem("authToken") : "";
    try {
      const response = await this.request<ICreateCityResponse>(
        "POST",
        `${config.public.apiBaseUrl}/api/crud/cities/${id}/update`,
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
      throw error.response?.data as ICreateCityErrorResponse;
    }
  }

  async deleteCityById(id: number, headers?: Record<string, string>): Promise<IDeleteCityResponse> {
    const config = useRuntimeConfig();
    const authToken = process.client ? localStorage.getItem("authToken") : "";
    try {
      const response = await this.request<IDeleteCityResponse>(
        "DELETE",
        `${config.public.apiBaseUrl}/api/crud/cities/${id}/delete`,
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
      throw error.response?.data as IDeleteCityErrorResponse;
    }
  }
}
