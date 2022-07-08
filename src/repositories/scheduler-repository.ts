import { ApiRepository } from './api-repository';
import { TaskMapper } from '../mappers/task-mapper';
import { Task } from '../models/scheduling/task';

export class SchedulerRepository extends ApiRepository {

    public async get(deviceId: string): Promise<Array<Task>> {
        const response = await this.getRequest(`/scheduler/get_scheduling_tasks/${deviceId}`);
        return response.map((x: any) => TaskMapper.map(x));
    }
}