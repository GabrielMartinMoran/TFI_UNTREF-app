import { Measure } from "./measure";

export class Device {
    protected _deviceId: string;
    protected _name: string;
    protected _active: boolean;
    protected _turnedOn: boolean;
    protected _measures: Array<Measure>;

    constructor(deviceId: string, name: string, active: boolean, turnedOn: boolean, measures: Array<Measure>) {
        this._deviceId = deviceId;
        this._name = name;
        this._active = active;
        this._turnedOn = turnedOn;
        this._measures = measures;
    }


    public get deviceId(): string {
        return this._deviceId;
    }

    public get name(): string {
        return this._name;
    }

    public get active(): boolean {
        return this._active;
    }

    public get turnedOn(): boolean {
        return this._turnedOn;
    }

    public get measures(): Array<Measure> {
        return this._measures;
    }


    public static fromObject(obj: any): Device {
        return new Device(
            obj.device_id,
            obj.name,
            obj.active,
            obj.turned_on,
            obj.measures.map((x: any) => Measure.fromObject(x))
        );
    }
}