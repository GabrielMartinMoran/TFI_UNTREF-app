import { Device } from '../../models/device';
import { Measure } from '../../models/measure';
import { WebApiRepository } from './web-api-repository';

export class DevicesRepository extends WebApiRepository {
    public async getAll(): Promise<Array<Device>> {
        const response = await this.getRequest('/devices/get_all');
        return response.map((x: unknown) => Device.fromObject(x));
    }

    public async getMeasures(deviceId: string, interval: number): Promise<Array<Measure>> {
        const response = await this.getRequest(`/devices/get_measures/${deviceId}/${interval}`);
        return response.map((x: unknown) => Measure.fromObject(x));
    }

    public async create(name: string): Promise<string> {
        const response = await this.postRequest('/devices/create', {
            name,
        });
        return response.id;
    }

    public async isTurnedOn(deviceId: string): Promise<boolean> {
        const response = await this.getRequest(`/devices/get_state/${deviceId}`);
        return response.turned_on;
    }
}
