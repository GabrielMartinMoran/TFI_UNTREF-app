import AsyncStorage from "@react-native-async-storage/async-storage";
import { CONFIG } from "../config";
import { HTTPError } from "../errors/http-error";

export class ApiRepository {

    private async request(method: string, path: string, body: any = null): Promise<any> {
        const url = `${CONFIG.API_URI}${path}`;
        const fetchOptions: any = {
            method: method,
            headers: await this.getHeaders()
        };
        if (body !== null) {
            fetchOptions.body = JSON.stringify(body ? body : {});
        }
        let response = null;
        let responseBody = {};
        try {
            response = await fetch(url, fetchOptions);
            responseBody = await response.json();
        } catch (error: any) {
            throw new HTTPError(`HTTP error: ${error}`, error);
        }
        if (!response.ok) throw new HTTPError(`${response.status} ${response.statusText}`, responseBody);
        return responseBody;
    }

    protected async post(path: string, body: object): Promise<any> {
        return await this.request('POST', path, body);
    }

    protected async get(path: string): Promise<any> {
        return await this.request('GET', path);
    }

    protected async getHeaders(): Promise<Headers> {
        const headers = new Headers();
        headers.set('Content-Type', 'application/json');

        // Authentication
        const token = await AsyncStorage.getItem('token');
        if (token) headers.set('Authorization', `Bearer ${token}`);

        return headers;
    }

}