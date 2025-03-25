import type {
  IShipmentResponse,
  IShipmentsResponse,
} from "../types/Others/Logistic/shipments";

export class CrudLogisticRep {
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

  async getShipments(
    params?: Record<string, any>,
    headers?: Record<string, string>
  ): Promise<IShipmentsResponse> {
    const config = useRuntimeConfig();
    const authToken = process.client ? localStorage.getItem("authToken") : "";
    return await this.request<IShipmentsResponse>(
      "GET",
      `${config.public.apiBaseUrl}/api/logistic/shipments`,
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

  async getShipmentById(
    id?: number,
    params?: Record<string, any>,
    headers?: Record<string, string>
  ): Promise<IShipmentResponse> {
    const config = useRuntimeConfig();
    const authToken = process.client ? localStorage.getItem("authToken") : "";
    return await this.request<IShipmentResponse>(
      "GET",
      `${config.public.apiBaseUrl}/api/logistic/shipments/create-edit-data${
        id ? `?shipment_id=${id}` : ""
      }`,
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

  async createShipment(
    formData: FormData,
    params?: Record<string, any>,
    headers?: Record<string, string>
  ): Promise<any> {
    const config = useRuntimeConfig();
    const authToken = process.client ? localStorage.getItem("authToken") : "";
    try {
      const response = await this.request<any>(
        "POST",
        `${config.public.apiBaseUrl}/api/logistic/shipments/create`,
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
      return error.response?.data as any;
    }
  }

  // async editProductById(
  //   id: number,
  //   formData: FormData,
  //   params?: Record<string, any>,
  //   headers?: Record<string, string>
  // ): Promise<IProductCreateResponse | IProductCreateErrorResponse> {
  //   const config = useRuntimeConfig();
  //   const authToken = process.client ? localStorage.getItem("authToken") : "";
  //   try {
  //     const response = await this.request<IProductCreateResponse>(
  //       "POST",
  //       `${config.public.apiBaseUrl}/api/crud/products/${id}/update`,
  //       {
  //         params: { ...params },
  //         body: formData,
  //         headers: {
  //           Authorization: `Bearer ${authToken}`,
  //           "Accept": "application/json",
  //           ...headers,
  //         },
  //       }
  //     );
  //     return response;
  //   } catch (error: any) {
  //     return error.response?.data as IProductCreateErrorResponse;
  //   }
  // }

  // async deleteProductById(
  //   id: number,
  //   headers?: Record<string, string>
  // ): Promise<IDeleteProductResponse> {
  //   const config = useRuntimeConfig();
  //   const authToken = process.client ? localStorage.getItem("authToken") : "";
  //   try {
  //     const response = await this.request<IDeleteProductResponse>(
  //       "DELETE",
  //       `${config.public.apiBaseUrl}/api/crud/products/${id}/delete`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${authToken}`,
  //           "Content-Type": "application/json",
  //           "Accept": "application/json",
  //           ...headers,
  //         },
  //       }
  //     );
  //     return response;
  //   } catch (error: any) {
  //     return error.response?.data as IDeleteProductResponse;
  //   }
  // }
}
