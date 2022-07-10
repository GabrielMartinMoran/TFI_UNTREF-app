import { ApiRepository } from './api-repository';
import { TaskMapper } from '../mappers/task-mapper';
import { Task } from '../models/scheduling/task';

export class SchedulerRepository extends ApiRepository {
    public async get(deviceId: string): Promise<Array<Task>> {
        const response = await this.getRequest(
            `/scheduler/get_scheduling_tasks/${deviceId}`
        );
        return response.map((x: any) => TaskMapper.map(x));
    }

    public async update(deviceId: string, tasks: Array<Task>): Promise<any> {
        console.log(
            'POST Request to update scheduling tasks',
            tasks.map((x) => x.toObject())
        );
        await this.postRequest(
            `/scheduler/set_scheduling_tasks/${deviceId}`,
            tasks.map((x) => x.toObject())
        );
    }
}
