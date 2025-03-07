import type {
  IDeleteMarketplaceResponse,
  IMarketplaceByIdErrorResponse,
  IMarketplaceByIdResponse,
  IMarketplaceResponse,
} from "../types/Others/Settings/Marketplaces/marketplaces.type";

export class CrudMarketplacesRep {
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

  async getMarketplaces(
    params?: Record<string, any>,
    headers?: Record<string, string>
  ): Promise<IMarketplaceResponse> {
    const config = useRuntimeConfig();
    const authToken = process.client ? localStorage.getItem("authToken") : "";
    return await this.request<IMarketplaceResponse>(
      "GET",
      `${config.public.apiBaseUrl}/api/crud/marketplaces`,
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

  async getMarketplaceById(
    id: number,
    params?: Record<string, any>,
    headers?: Record<string, string>
  ): Promise<IMarketplaceByIdResponse> {
    const config = useRuntimeConfig();
    const authToken = process.client ? localStorage.getItem("authToken") : "";
    return await this.request<IMarketplaceByIdResponse>(
      "GET",
      `${config.public.apiBaseUrl}/api/crud/marketplaces/${id}/show`,
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

  async createMarketplace(
    body: Record<string, any>,
    params?: Record<string, any>,
    headers?: Record<string, string>
  ): Promise<IMarketplaceByIdResponse | IMarketplaceByIdErrorResponse> {
    const config = useRuntimeConfig();
    const authToken = process.client ? localStorage.getItem("authToken") : "";
    try {
      const response = await this.request<IMarketplaceByIdResponse>(
        "POST",
        `${config.public.apiBaseUrl}/api/crud/marketplaces/create`,
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
      return error.response?.data as IMarketplaceByIdErrorResponse;
    }
  }

  async editMarketplaceById(
    id: number,
    body: Record<string, any>,
    params?: Record<string, any>,
    headers?: Record<string, string>
  ): Promise<IMarketplaceByIdResponse | IMarketplaceByIdErrorResponse> {
    const config = useRuntimeConfig();
    const authToken = process.client ? localStorage.getItem("authToken") : "";
    try {
      const response = await this.request<IMarketplaceByIdResponse>(
        "POST",
        `${config.public.apiBaseUrl}/api/crud/marketplaces/${id}/update`,
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
      return error.response?.data as IMarketplaceByIdErrorResponse;
    }
  }

  async deleteMarketplaceById(
    id: number,
    headers?: Record<string, string>
  ): Promise<IDeleteMarketplaceResponse> {
    const config = useRuntimeConfig();
    const authToken = process.client ? localStorage.getItem("authToken") : "";
    try {
      const response = await this.request<IDeleteMarketplaceResponse>(
        "DELETE",
        `${config.public.apiBaseUrl}/api/crud/marketplaces/${id}/delete`,
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
      return error.response?.data as IDeleteMarketplaceResponse;
    }
  }
}
