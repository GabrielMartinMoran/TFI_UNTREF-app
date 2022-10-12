import { TaskMapper } from '../../mappers/task-mapper';
import { Task } from '../../models/scheduling/task';
import { WebApiRepository } from './web-api-repository';

export class SchedulerRepository extends WebApiRepository {
    public async get(deviceId: string): Promise<Array<Task>> {
        const response = await this.getRequest(`/scheduler/get_scheduling_tasks/${deviceId}`);
        return response.map((x: any) => TaskMapper.map(x));
    }

    public async update(deviceId: string, tasks: Array<Task>): Promise<any> {
        await this.postRequest(
            `/scheduler/set_scheduling_tasks/${deviceId}`,
            tasks.map((x) => x.toObject())
        );
    }
}
