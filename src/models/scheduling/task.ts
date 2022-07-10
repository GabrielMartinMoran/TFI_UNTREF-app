export class Task {
    protected _action: string;
    protected _moment: Date;

    constructor(action: string, moment: Date) {
        this._action = action;
        this._moment = moment;
    }

    public static get ACTIONS() {
        return {
            TURN_DEVICE_ON: 'TURN_DEVICE_ON',
            TURN_DEVICE_OFF: 'TURN_DEVICE_OFF',
        };
    }

    public static fromObject(obj: any): Task {
        return new Task(obj.action, new Date(Date.parse(obj.moment as string)));
    }

    public static new(): Task {
        const moment = new Date();
        moment.setHours(moment.getHours() + 1);
        moment.setMinutes(0);
        return new Task(this.ACTIONS.TURN_DEVICE_ON, moment);
    }

    public get action(): string {
        return this._action;
    }

    public set action(action: string) {
        this._action = action;
    }

    public get moment(): Date {
        return this._moment;
    }

    public isTurningOn(): boolean {
        return this.action === 'TURN_DEVICE_ON';
    }

    public clone(): Task {
        return new Task(this.action, new Date(this.moment.getTime()));
    }

    toObject(): any {
        return {
            action: this.action,
            moment: this.moment.toISOString(),
        };
    }
}
