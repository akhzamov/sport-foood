import type {
  IShipmentDeleteResponse,
  IShipmentEditResponse,
  IShipmentGetResponse,
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
    try {
      const response = await this.request<IShipmentsResponse>(
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
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getShipmentById(
    id?: number,
    params?: Record<string, any>,
    headers?: Record<string, string>
  ): Promise<IShipmentGetResponse> {
    const config = useRuntimeConfig();
    const authToken = process.client ? localStorage.getItem("authToken") : "";
    try {
      const response = await this.request<IShipmentGetResponse>(
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
      return response;
    } catch (error) {
      throw error;
    }
  }

  async createShipment(
    formData: FormData,
    params?: Record<string, any>,
    headers?: Record<string, string>
  ): Promise<IShipmentEditResponse> {
    const config = useRuntimeConfig();
    const authToken = process.client ? localStorage.getItem("authToken") : "";
    try {
      const response = await this.request<IShipmentEditResponse>(
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
      throw error;
    }
  }

  async editShipmentById(
    id: number,
    formData: FormData,
    params?: Record<string, any>,
    headers?: Record<string, string>
  ): Promise<IShipmentEditResponse> {
    const config = useRuntimeConfig();
    const authToken = process.client ? localStorage.getItem("authToken") : "";
    try {
      const response = await this.request<IShipmentEditResponse>(
        "POST",
        `${config.public.apiBaseUrl}/api/logistic/shipments/${id}/update`,
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
      throw error;
    }
  }

  async deleteShipment(id: number, headers?: Record<string, string>): Promise<IShipmentDeleteResponse> {
    const config = useRuntimeConfig();
    const authToken = process.client ? localStorage.getItem("authToken") : "";
    try {
      const response = await this.request<IShipmentDeleteResponse>(
        "DELETE",
        `${config.public.apiBaseUrl}/api/crud/shipments/${id}/delete`,
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
      throw error;
    }
  }
}
