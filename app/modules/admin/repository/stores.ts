import type {
  ICrudStoreDeleteResponse,
  ICrudStoreIdResponse,
  ICrudStoreResponse,
  ICrudStoreCreateResponse,
  ICrudStoreIdErrorResponse,
} from "../types/Others/Settings/Stores/stores.type";

export class CrudStoresRep {
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
  ): Promise<ICrudStoreResponse> {
    const config = useRuntimeConfig();
    const authToken = process.client ? localStorage.getItem("authToken") : "";
    return await this.request<ICrudStoreResponse>("GET", `${config.public.apiBaseUrl}/api/crud/stores`, {
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

  async getStoreById(
    id: number,
    params?: Record<string, any>,
    headers?: Record<string, string>
  ): Promise<ICrudStoreIdResponse> {
    const config = useRuntimeConfig();
    const authToken = process.client ? localStorage.getItem("authToken") : "";
    return await this.request<ICrudStoreIdResponse>(
      "GET",
      `${config.public.apiBaseUrl}/api/crud/stores/${id}/get`,
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

  async createStore(
    formData: FormData,
    params?: Record<string, any>,
    headers?: Record<string, string>
  ): Promise<ICrudStoreCreateResponse> {
    const config = useRuntimeConfig();
    const authToken = process.client ? localStorage.getItem("authToken") : "";
    try {
      const response = await this.request<ICrudStoreCreateResponse>(
        "POST",
        `${config.public.apiBaseUrl}/api/crud/stores/create`,
        {
          params: { ...params },
          body: formData,
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Accept": "application/json",
            ...headers,
          },
        }
      );
      return response;
    } catch (error: any) {
      throw error.response?.data as ICrudStoreIdErrorResponse;
    }
  }

  async editStoreById(
    id: number,
    formData: FormData,
    params?: Record<string, any>,
    headers?: Record<string, string>
  ): Promise<ICrudStoreCreateResponse> {
    const config = useRuntimeConfig();
    const authToken = process.client ? localStorage.getItem("authToken") : "";
    try {
      const response = await this.request<ICrudStoreCreateResponse>(
        "POST",
        `${config.public.apiBaseUrl}/api/crud/stores/${id}/update`,
        {
          params: { ...params },
          body: formData,
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Accept": "application/json",
            ...headers,
          },
        }
      );
      return response;
    } catch (error: any) {
      throw error.response?.data as ICrudStoreIdErrorResponse;
    }
  }

  async deleteStoreById(id: number, headers?: Record<string, string>): Promise<ICrudStoreDeleteResponse> {
    const config = useRuntimeConfig();
    const authToken = process.client ? localStorage.getItem("authToken") : "";
    try {
      const response = await this.request<ICrudStoreDeleteResponse>(
        "DELETE",
        `${config.public.apiBaseUrl}/api/crud/stores/${id}/delete`,
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
      throw error.response?.data as ICrudStoreDeleteResponse;
    }
  }
}
