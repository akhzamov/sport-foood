type TLogin = {
  token: string;
};

export class LoginRep {
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

  async login(body?: Record<string, string>): Promise<TLogin> {
    const config = useRuntimeConfig();
    return await this.request<TLogin>(
      "POST",
      `${config.public.apiBaseUrl}/api/login`,
      {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Origin": window.location.origin,
        },
        body: {
          ...body,
        },
      }
    );
  }
}
