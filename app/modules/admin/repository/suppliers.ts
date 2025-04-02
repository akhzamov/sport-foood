import type {
  IDeleteProductResponse,
  IProductByIdResponse,
  IProductCreateErrorResponse,
  IProductCreateResponse,
  IProductResponse,
} from "../types/Others/Settings/Products/products.type";
import type {
  IDeleteSupplierResponse,
  ISupplierByIdResponse,
  ISupplierCreateErrorResponse,
  ISupplierCreateResponse,
  ISuppliersResponse,
} from "../types/Others/Settings/Suppliers/suppliers.type";

export class CrudSuppliersRep {
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

  async getSuppliers(
    params?: Record<string, any>,
    headers?: Record<string, string>
  ): Promise<ISuppliersResponse> {
    const config = useRuntimeConfig();
    const authToken = process.client ? localStorage.getItem("authToken") : "";
    return await this.request<ISuppliersResponse>("GET", `${config.public.apiBaseUrl}/api/crud/suppliers`, {
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

  async getSupplierById(
    id: number,
    params?: Record<string, any>,
    headers?: Record<string, string>
  ): Promise<ISupplierByIdResponse> {
    const config = useRuntimeConfig();
    const authToken = process.client ? localStorage.getItem("authToken") : "";
    return await this.request<ISupplierByIdResponse>(
      "GET",
      `${config.public.apiBaseUrl}/api/crud/suppliers/${id}/get`,
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

  async createSupplier(
    body: Record<string, any>,
    params?: Record<string, any>,
    headers?: Record<string, string>
  ): Promise<ISupplierCreateResponse> {
    const config = useRuntimeConfig();
    const authToken = process.client ? localStorage.getItem("authToken") : "";
    try {
      const response = await this.request<ISupplierCreateResponse>(
        "POST",
        `${config.public.apiBaseUrl}/api/crud/suppliers/create`,
        {
          params: { ...params },
          body: body,
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Accept": "application/json",
            ...headers,
          },
        }
      );
      return response;
    } catch (error: any) {
      throw error.response?.data as ISupplierCreateErrorResponse;
    }
  }

  async editSupplierById(
    id: number,
    body: Record<string, any>,
    params?: Record<string, any>,
    headers?: Record<string, string>
  ): Promise<ISupplierCreateResponse> {
    const config = useRuntimeConfig();
    const authToken = process.client ? localStorage.getItem("authToken") : "";
    try {
      const response = await this.request<ISupplierCreateResponse>(
        "POST",
        `${config.public.apiBaseUrl}/api/crud/suppliers/${id}/update`,
        {
          params: { ...params },
          body: body,
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Accept": "application/json",
            ...headers,
          },
        }
      );
      return response;
    } catch (error: any) {
      throw error.response?.data as ISupplierCreateErrorResponse;
    }
  }

  async deleteSupplierById(id: number, headers?: Record<string, string>): Promise<IDeleteSupplierResponse> {
    const config = useRuntimeConfig();
    const authToken = process.client ? localStorage.getItem("authToken") : "";
    try {
      const response = await this.request<IDeleteSupplierResponse>(
        "DELETE",
        `${config.public.apiBaseUrl}/api/crud/suppliers/${id}/delete`,
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
      throw error.response?.data as IDeleteSupplierResponse;
    }
  }
}
