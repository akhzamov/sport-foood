import type {
  IDeleteProductResponse,
  IProductByIdResponse,
  IProductCreateErrorResponse,
  IProductCreateResponse,
  IProductResponse,
} from "../types/Others/Settings/Products/products.type";

export class CrudProductsRep {
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

  async getProducts(
    params?: Record<string, any>,
    headers?: Record<string, string>
  ): Promise<IProductResponse> {
    const config = useRuntimeConfig();
    const authToken = process.client ? localStorage.getItem("authToken") : "";
    return await this.request<IProductResponse>(
      "GET",
      `${config.public.apiBaseUrl}/api/crud/products`,
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

  async getProductById(
    id: number,
    params?: Record<string, any>,
    headers?: Record<string, string>
  ): Promise<IProductByIdResponse> {
    const config = useRuntimeConfig();
    const authToken = process.client ? localStorage.getItem("authToken") : "";
    return await this.request<IProductByIdResponse>(
      "GET",
      `${config.public.apiBaseUrl}/api/crud/products/${id}/get`,
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

  async createProductById(
    formData: FormData,
    params?: Record<string, any>,
    headers?: Record<string, string>
  ): Promise<IProductCreateResponse | IProductCreateErrorResponse> {
    const config = useRuntimeConfig();
    const authToken = process.client ? localStorage.getItem("authToken") : "";
    try {
      const response = await this.request<IProductCreateResponse>(
        "POST",
        `${config.public.apiBaseUrl}/api/crud/products/create`,
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
      return error.response?.data as IProductCreateErrorResponse;
    }
  }

  async editProductById(
    id: number,
    formData: FormData,
    params?: Record<string, any>,
    headers?: Record<string, string>
  ): Promise<IProductCreateResponse | IProductCreateErrorResponse> {
    const config = useRuntimeConfig();
    const authToken = process.client ? localStorage.getItem("authToken") : "";
    try {
      const response = await this.request<IProductCreateResponse>(
        "POST",
        `${config.public.apiBaseUrl}/api/crud/products/${id}/update`,
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
      return error.response?.data as IProductCreateErrorResponse;
    }
  }

  async deleteProductById(
    id: number,
    headers?: Record<string, string>
  ): Promise<IDeleteProductResponse> {
    const config = useRuntimeConfig();
    const authToken = process.client ? localStorage.getItem("authToken") : "";
    try {
      const response = await this.request<IDeleteProductResponse>(
        "DELETE",
        `${config.public.apiBaseUrl}/api/crud/products/${id}/delete`,
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
      return error.response?.data as IDeleteProductResponse;
    }
  }
}
