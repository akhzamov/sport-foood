import type { ISalesAgentLeft } from './../types/Warehouse/salesAgentLeft.type';

export class SalesAgentLeftRep {
  private async request<T>(
    method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
    url: string,
    options?: Record<string, any>
  ) {
    return await $fetch<T>(url, {
      method,
      ...options,
    });
  }

  async getSalesAgent(
    params?: Record<string, any>,
    headers?: Record<string, string>
  ): Promise<ISalesAgentLeft> {
    const config = useRuntimeConfig();
    const authToken = process.client ? localStorage.getItem("authToken") : "";
    return await this.request<ISalesAgentLeft>(
      "GET",
      `${config.public.apiBaseUrl}/api/sales-agent-left`,
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
}
