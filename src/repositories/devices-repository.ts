import { Device } from "../models/device";
import { Measure } from "../models/measure";
import { ApiRepository } from "./api-repository";

export class DevicesRepository extends ApiRepository {

    public async getAll(): Promise<Array<Device>> {
        const response = await this.get('/devices/get_all');
        return response.map((x: any) => Device.fromObject(x));
    }

    public async getMeasures(deviceId: string, interval: number): Promise<Array<Measure>> {
        const response = await this.get(`/devices/get_measures/${deviceId}/${interval}`);
        return response.map((x: any) => Measure.fromObject(x));
    }
}