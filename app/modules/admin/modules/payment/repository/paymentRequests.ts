import type {
  IPromiseRequestPayments,
  IPromiseRequestPriorities,
  IPromiseRequestStatuses,
  IPromiseRequestTypes,
} from "../types/Requests/paymentRequests.type";

export class PaymentRequestsRep {
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

  async getTypes(
    params?: Record<string, any>,
    headers?: Record<string, string>
  ): Promise<IPromiseRequestTypes> {
    const config = useRuntimeConfig();
    const authToken = process.client ? localStorage.getItem("authToken") : "";
    return await this.request<IPromiseRequestTypes>(
      "GET",
      `${config.public.apiBaseUrl}/api/crud/payment/types`,
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
  async getStatuses(
    params?: Record<string, any>,
    headers?: Record<string, string>
  ): Promise<IPromiseRequestStatuses> {
    const config = useRuntimeConfig();
    const authToken = process.client ? localStorage.getItem("authToken") : "";
    return await this.request<IPromiseRequestStatuses>(
      "GET",
      `${config.public.apiBaseUrl}/api/crud/payment/statuses`,
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
  async getPriorities(
    params?: Record<string, any>,
    headers?: Record<string, string>
  ): Promise<IPromiseRequestPriorities> {
    const config = useRuntimeConfig();
    const authToken = process.client ? localStorage.getItem("authToken") : "";
    return await this.request<IPromiseRequestPriorities>(
      "GET",
      `${config.public.apiBaseUrl}/api/crud/payment/priorities`,
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
  async getPayments(
    params?: Record<string, any>,
    headers?: Record<string, string>
  ): Promise<IPromiseRequestPayments> {
    const config = useRuntimeConfig();
    const authToken = process.client ? localStorage.getItem("authToken") : "";
    return await this.request<IPromiseRequestPayments>(
      "GET",
      `${config.public.apiBaseUrl}/api/crud/payments`,
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
  // async editPaymentById(
  //   id: number,
  //   body?: Record<string, any>,
  //   params?: Record<string, any>,
  //   headers?: Record<string, string>
  // ): Promise<IDriverHandle> {
  //   const config = useRuntimeConfig();
  //   const authToken = process.client ? localStorage.getItem("authToken") : "";
  //   return await this.request<IDriverHandle>(
  //     "POST",
  //     `${config.public.apiBaseUrl}/api/crud/drivers/${id}/update`,
  //     {
  //       params: {
  //         ...params,
  //       },
  //       body: {
  //         ...body,
  //       },
  //       headers: {
  //         Authorization: `Bearer ${authToken}`,
  //         "Content-Type": "application/json",
  //         "Accept": "application/json",
  //         // "Origin": window.location.origin,
  //         ...headers,
  //       },
  //     }
  //   );
  // }
  // async createPatent(
  //   body?: Record<string, any>,
  //   params?: Record<string, any>,
  //   headers?: Record<string, string>
  // ): Promise<IDriverHandle> {
  //   const config = useRuntimeConfig();
  //   const authToken = process.client ? localStorage.getItem("authToken") : "";
  //   return await this.request<IDriverHandle>(
  //     "POST",
  //     `${config.public.apiBaseUrl}/api/crud/drivers/store`,
  //     {
  //       params: {
  //         ...params,
  //       },
  //       body: {
  //         ...body,
  //       },
  //       headers: {
  //         Authorization: `Bearer ${authToken}`,
  //         "Content-Type": "application/json",
  //         "Accept": "application/json",
  //         // "Origin": window.location.origin,
  //         ...headers,
  //       },
  //     }
  //   );
  // }
  // async deletePaymentById(
  //   id: number,
  //   headers?: Record<string, string>
  // ): Promise<TDriverRemove> {
  //   const config = useRuntimeConfig();
  //   const authToken = process.client ? localStorage.getItem("authToken") : "";
  //   return await this.request<TDriverRemove>(
  //     "DELETE",
  //     `${config.public.apiBaseUrl}/api/crud/drivers/${id}`,
  //     {
  //       headers: {
  //         Authorization: `Bearer ${authToken}`,
  //         "Content-Type": "application/json",
  //         "Accept": "application/json",
  //         // "Origin": window.location.origin,
  //         ...headers,
  //       },
  //     }
  //   );
  // }
}
