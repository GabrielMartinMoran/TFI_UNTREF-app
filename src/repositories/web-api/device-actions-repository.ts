import { WebApiRepository } from './web-api-repository';

export class DevicesActionsRepository extends WebApiRepository {
    private readonly TURN_DEVICE_ON: string = 'TURN_DEVICE_ON';
    private readonly TURN_DEVICE_OFF: string = 'TURN_DEVICE_OFF';

    public async sendStateAction(deviceId: string, turnOn: boolean): Promise<void> {
        await this.postRequest(`/instantactions/action/${deviceId}`, {
            action: turnOn ? this.TURN_DEVICE_ON : this.TURN_DEVICE_OFF,
        });
    }
}
