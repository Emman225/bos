const API_BASE = 'https://apibos.yemimainternational.com/api';
const REQUEST_TIMEOUT = 15000;

class ApiClient {
  private token: string | null = localStorage.getItem('bos_jwt_token');

  private headers(): HeadersInit {
    const h: HeadersInit = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
    if (this.token) {
      h['Authorization'] = `Bearer ${this.token}`;
    }
    return h;
  }

  private createAbortSignal(): AbortSignal {
    const controller = new AbortController();
    setTimeout(() => controller.abort(), REQUEST_TIMEOUT);
    return controller.signal;
  }

  private async safeJson(res: Response): Promise<any> {
    try {
      return await res.json();
    } catch {
      return {};
    }
  }

  private handleUnauthorized(res: Response): void {
    if (res.status === 401) {
      this.clearToken();
    }
  }

  private extractErrorMessage(err: any, fallback: string): string {
    if (err.errors && typeof err.errors === 'object') {
      const firstField = Object.values(err.errors)[0];
      if (Array.isArray(firstField) && firstField.length > 0) {
        return firstField[0];
      }
    }
    return err.message || err.error || fallback;
  }

  setToken(token: string): void {
    this.token = token;
    localStorage.setItem('bos_jwt_token', token);
  }

  clearToken(): void {
    this.token = null;
    localStorage.removeItem('bos_jwt_token');
  }

  getToken(): string | null {
    return this.token;
  }

  async get<T>(path: string): Promise<T> {
    const res = await fetch(`${API_BASE}${path}`, { headers: this.headers(), signal: this.createAbortSignal() });
    this.handleUnauthorized(res);
    if (!res.ok) throw new Error(`GET ${path} failed: ${res.status}`);
    const json = await this.safeJson(res);
    return json.data !== undefined ? json.data : json;
  }

  async post<T>(path: string, body?: unknown): Promise<T> {
    const res = await fetch(`${API_BASE}${path}`, {
      method: 'POST',
      headers: this.headers(),
      body: body ? JSON.stringify(body) : undefined,
      signal: this.createAbortSignal(),
    });
    this.handleUnauthorized(res);
    if (!res.ok) {
      const err = await this.safeJson(res);
      throw new Error(this.extractErrorMessage(err, `POST ${path} failed: ${res.status}`));
    }
    const json = await this.safeJson(res);
    return json.data !== undefined ? json.data : json;
  }

  async put<T>(path: string, body: unknown): Promise<T> {
    const res = await fetch(`${API_BASE}${path}`, {
      method: 'PUT',
      headers: this.headers(),
      body: JSON.stringify(body),
      signal: this.createAbortSignal(),
    });
    this.handleUnauthorized(res);
    if (!res.ok) {
      const err = await this.safeJson(res);
      throw new Error(this.extractErrorMessage(err, `PUT ${path} failed: ${res.status}`));
    }
    const json = await this.safeJson(res);
    return json.data !== undefined ? json.data : json;
  }

  async patch<T>(path: string, body: unknown): Promise<T> {
    const res = await fetch(`${API_BASE}${path}`, {
      method: 'PATCH',
      headers: this.headers(),
      body: JSON.stringify(body),
      signal: this.createAbortSignal(),
    });
    this.handleUnauthorized(res);
    if (!res.ok) {
      const err = await this.safeJson(res);
      throw new Error(this.extractErrorMessage(err, `PATCH ${path} failed: ${res.status}`));
    }
    const json = await this.safeJson(res);
    return json.data !== undefined ? json.data : json;
  }

  async postFormData<T>(path: string, formData: FormData): Promise<T> {
    const h: HeadersInit = { 'Accept': 'application/json' };
    if (this.token) h['Authorization'] = `Bearer ${this.token}`;
    const res = await fetch(`${API_BASE}${path}`, {
      method: 'POST',
      headers: h,
      body: formData,
      signal: this.createAbortSignal(),
    });
    this.handleUnauthorized(res);
    if (!res.ok) {
      const err = await this.safeJson(res);
      throw new Error(this.extractErrorMessage(err, `POST ${path} failed: ${res.status}`));
    }
    const json = await this.safeJson(res);
    return json.data !== undefined ? json.data : json;
  }

  async delete(path: string): Promise<void> {
    const res = await fetch(`${API_BASE}${path}`, {
      method: 'DELETE',
      headers: this.headers(),
      signal: this.createAbortSignal(),
    });
    this.handleUnauthorized(res);
    if (!res.ok) throw new Error(`DELETE ${path} failed: ${res.status}`);
  }
}

export const apiClient = new ApiClient();
