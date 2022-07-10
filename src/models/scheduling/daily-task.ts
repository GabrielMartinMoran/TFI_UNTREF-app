import { Task } from './task';
import { Weekdays } from '../../utils/weekdays';

export class DailyTask extends Task {
    private _weekdays: Array<number>;

    constructor(action: string, moment: Date, weekdays: Array<number>) {
        super(action, moment);
        this._weekdays = weekdays;
    }

    public static fromObject(obj: any): DailyTask {
        return new DailyTask(
            obj.action,
            new Date(Date.parse(obj.moment as string)),
            obj.weekdays
        );
    }

    public static new(): DailyTask {
        const moment = new Date();
        moment.setHours(moment.getHours() + 1);
        moment.setMinutes(0);
        return new DailyTask(
            this.ACTIONS.TURN_DEVICE_ON,
            moment,
            Weekdays.all()
        );
    }

    public static fromTask(task: Task): DailyTask {
        return new DailyTask(task.action, task.moment, Weekdays.all());
    }

    public get weekdays(): Array<number> {
        return this._weekdays;
    }

    public set weekdays(weekdays: Array<number>) {
        this._weekdays = weekdays;
    }

    public hasWeekday(weekday: number): boolean {
        return this.weekdays.filter((x) => x === weekday).length > 0;
    }

    public toTask(): Task {
        return new Task(this.action, this.moment);
    }

    public clone(): DailyTask {
        return new DailyTask(this.action, new Date(this.moment.getTime()), [
            ...this.weekdays,
        ]);
    }

    toObject(): any {
        return {
            action: this.action,
            moment: this.moment.toISOString(),
            weekdays: this.weekdays,
        };
    }
}
