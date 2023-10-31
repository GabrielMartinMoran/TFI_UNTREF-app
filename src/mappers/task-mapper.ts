import { Task } from '../models/scheduling/task';
import { DailyTask } from '../models/scheduling/daily-task';

export class TaskMapper {

    public static map(obj: any): Task {
        if (obj.weekdays !== undefined) {
            return DailyTask.fromObject(obj);
        }
        return Task.fromObject(obj);
    }
}