import { Task } from './task';
import { Weekdays } from '../../utils/weekdays';

export class DailyTask extends Task {
    private _weekdays: Array<number>;

    constructor(action: string, moment: Date, weekdays: Array<number>) {
        super(action, moment);
        this._weekdays = weekdays;
    }

    public get weekdays(): Array<number> {
        return this._weekdays;
    }

    public hasWeekday(weekday: number): boolean {
        return this.weekdays.filter((x) => x === weekday).length > 0;
    }

    public static fromObject(obj: any): DailyTask {
        return new DailyTask(
            obj.action,
            new Date(Date.parse(obj.moment as string)),
            obj.weekdays
        );
    }
}
