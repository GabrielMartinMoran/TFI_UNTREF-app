export class Task {
    protected _action: string;
    protected _moment: Date;

    constructor(action: string, moment: Date) {
        this._action = action;
        this._moment = moment;
    }

    public get action(): string {
        return this._action;
    }

    public get moment(): Date {
        return this._moment;
    }

    public isTurningOn(): boolean {
        return this.action === 'TURN_DEVICE_ON';
    }

    public static fromObject(obj: any): Task {
        return new Task(obj.action, new Date(Date.parse(obj.moment as string)));
    }
}
