import AsyncStorage from "@react-native-async-storage/async-storage";
import { ApiRepository } from "./api-repository";

export class AuthRepository extends ApiRepository {

    public async login(email: string, password: string): Promise<any> {
        const response = await this.post('/auth/login', { email, password });
        await AsyncStorage.setItem('token', response.token);
    }

    public async logout(): Promise<any> {
        await AsyncStorage.removeItem('token');
    }

    public async isLogged(): Promise<boolean> {
        return !!(await AsyncStorage.getItem('token'));
    }
}