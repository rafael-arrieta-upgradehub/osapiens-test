declare global {
    interface Window { vars: any; }
}

window.vars = window.vars || {};

export enum HttpMethod {
    GET = 'GET',
    POST = 'POST',
    PATCH = 'PATCH',
    PUT = 'PUT',
    DELETE = 'DELETE',
}
export type ExtendedResponse<T> = T & Response;
export interface RequestOptions {
    method?: HttpMethod;
    headers?: Record<string, string>;
    body?: BodyInit | null | { [key: string]: any };
}

export class ApiClient {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl =  baseUrl
    }

    async request<T>(url: string, params?: Record<string, any>, options: RequestOptions = {}, rawResponse: boolean = false): Promise<T | null>  {
        const queryParams = params ? `?${new URLSearchParams(params).toString()}` : '';
        const fullUrl = `${this.baseUrl}${url}${queryParams}`;

        const fetchOptions: RequestInit = {
            ...options,
            method: options.method || HttpMethod.GET,
            headers: options.headers || {
                mode: 'no-cors'
            },
            body: options.body ? JSON.stringify(options.body) : undefined,
        };
        try {
            const response = await fetch(fullUrl, fetchOptions);
            if (!response.ok && rawResponse) {
                throw await response.json()
            }
            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`);
            }
            if (fetchOptions.method === HttpMethod.DELETE && response.ok) {
                return null
            }

            return response.json();
        } catch (error: any) {
            if (rawResponse) {
                throw new Error(error.message);
            }
            throw new Error(`Request failed: ${error.message}`);
        }
    }

}

