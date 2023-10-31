import AsyncStorage from '@react-native-async-storage/async-storage';
import { CONFIG } from '../../config';
import { ApiRepository } from '../api-repository';

export class WebApiRepository extends ApiRepository {
    protected getURI(): string {
        return CONFIG.API_URI;
    }

    protected async getHeaders(): Promise<Headers> {
        const headers = await super.getHeaders();

        // Authentication
        const token = await AsyncStorage.getItem('token');
        if (token) headers.set('Authorization', `Bearer ${token}`);

        return headers;
    }
}
