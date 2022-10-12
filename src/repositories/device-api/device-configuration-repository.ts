import { CONFIG } from '../../config';
import { ApiRepository } from '../api-repository';

export class DeviceConfigurationRepository extends ApiRepository {
    protected getURI(): string {
        return CONFIG.DEVICE_API_URI;
    }

    public async searchDevice(): Promise<boolean> {
        try {
            const response = await this.getRequest('/health');
            return response.active;
        } catch (HTTPError) {
            return false;
        }
    }

    public async getDeviceId(): Promise<string | null> {
        const response = await this.getRequest('/device_id');
        return response.device_id;
    }

    public async setDeviceId(deviceId: string): Promise<void> {
        await this.postRequest('/device_id', { device_id: deviceId });
    }

    public async setToken(token: string): Promise<void> {
        await this.postRequest('/token', { token });
    }

    public async getAvailableNetworks(): Promise<string[]> {
        return this.getRequest('/networks');
    }

    public async configureNetwork(ssid: any, password: string): Promise<void> {
        await this.postRequest('/networks', { ssid, password });
    }
}
