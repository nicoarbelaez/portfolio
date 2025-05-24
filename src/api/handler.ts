interface RequestConfig {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: HeadersInit;
  body?: BodyInit;
}

export class APIError extends Error {
  constructor(
    public status: number,
    message: string
  ) {
    super(message);
    this.name = 'APIError';
  }
}

export async function apiHandler<T>(endpoint: string, config?: RequestConfig): Promise<T> {
  const response = await fetch(endpoint, {
    method: config?.method || 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(config?.headers as Record<string, string>)
    },
    body: config?.body
  });

  if (!response.ok) {
    throw new APIError(response.status, `API error: ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}
