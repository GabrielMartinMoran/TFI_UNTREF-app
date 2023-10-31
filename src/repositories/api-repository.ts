import { HTTPError } from '../errors/http-error';

export abstract class ApiRepository {
    protected abstract getURI(): string;

    private async request(method: string, path: string, body: any = null): Promise<any> {
        const url = `${this.getURI()}${path}`;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const fetchOptions: any = {
            method: method,
            headers: await this.getHeaders(),
        };
        if (body !== null) {
            fetchOptions.body = JSON.stringify(body ? body : {});
        }
        let response = null;
        let responseBody = {};
        try {
            response = await fetch(url, fetchOptions);
            responseBody = await response.json();
        } catch (error: unknown) {
            throw new HTTPError(`HTTP error: ${error}`, error);
        }
        if (!response.ok) throw new HTTPError(`${response.status} ${response.statusText}`, responseBody);
        return responseBody;
    }

    protected async postRequest(path: string, body: object): Promise<any> {
        return await this.request('POST', path, body);
    }

    protected async getRequest(path: string): Promise<any> {
        return await this.request('GET', path);
    }

    protected async getHeaders(): Promise<Headers> {
        const headers = new Headers();
        headers.set('Content-Type', 'application/json');
        return headers;
    }
}
