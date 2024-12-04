import type {
  ISalesAgent,
  ISalesAgents,
  ISalesAgentEdit,
  ISalesAgentDelete,
} from "~/modules/admin/types/Personal/SalesAgents/salesAgents.type";

export class SalesAgentsRep {
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

  async getSalesAgents(
    params?: Record<string, any>,
    headers?: Record<string, string>
  ): Promise<ISalesAgents> {
    const config = useRuntimeConfig();
    const authToken = process.client ? localStorage.getItem("authToken") : "";
    return await this.request<ISalesAgents>(
      "GET",
      `${config.public.apiBaseUrl}/api/crud/agents`,
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
  async getSalesAgentById(
    id: number,
    params?: Record<string, any>,
    headers?: Record<string, string>
  ): Promise<ISalesAgent> {
    const config = useRuntimeConfig();
    const authToken = process.client ? localStorage.getItem("authToken") : "";
    return await this.request<ISalesAgent>(
      "GET",
      `${config.public.apiBaseUrl}/api/crud/agents/${id}`,
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
  async updateSalesAgentById(
    id: number,
    body?: Record<string, any>,
    params?: Record<string, any>,
    headers?: Record<string, string>
  ): Promise<ISalesAgentEdit> {
    const config = useRuntimeConfig();
    const authToken = process.client ? localStorage.getItem("authToken") : "";
    return await this.request<ISalesAgentEdit>(
      "POST",
      `${config.public.apiBaseUrl}/api/crud/agents/${id}/update`,
      {
        params: {
          ...params,
        },
        body: {
          ...body,
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
  async deleteSalesAgentById(
    id: number,
    body?: Record<string, any>,
    params?: Record<string, any>,
    headers?: Record<string, string>
  ): Promise<ISalesAgentDelete> {
    const config = useRuntimeConfig();
    const authToken = process.client ? localStorage.getItem("authToken") : "";
    return await this.request<ISalesAgentDelete>(
      "DELETE",
      `${config.public.apiBaseUrl}/api/crud/agents/${id}`,
      {
        params: {
          ...params,
        },
        body: {
          ...body,
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
