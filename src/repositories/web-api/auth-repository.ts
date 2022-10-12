import AsyncStorage from '@react-native-async-storage/async-storage';
import { WebApiRepository } from './web-api-repository';

export class AuthRepository extends WebApiRepository {
    public async login(email: string, password: string): Promise<any> {
        const response = await this.postRequest('/auth/login', {
            email,
            password,
        });
        await AsyncStorage.setItem('token', response.token);
    }

    public async logout(): Promise<any> {
        await AsyncStorage.removeItem('token');
    }

    public async isLogged(): Promise<boolean> {
        return !!(await AsyncStorage.getItem('token'));
    }

    public async getToken(): Promise<string> {
        return (await AsyncStorage.getItem('token'))!;
    }
}
