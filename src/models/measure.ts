export class Measure {
    protected _current: number;
    protected _voltage: number;
    protected _power: number;
    protected _timestamp: Date;

    constructor(current: number, voltage: number, power: number, timestamp: Date) {
        this._current = current;
        this._voltage = voltage;
        this._power = power;
        this._timestamp = timestamp;
    }


    public get current(): number {
        return this._current;
    }

    public get voltage(): number {
        return this._voltage;
    }

    public get power(): number {
        return this._power;
    }

    public get timestamp(): Date {
        return this._timestamp;
    }


    public static fromObject(obj: any): Measure {
        return new Measure(
            obj.current,
            obj.voltage,
            obj.power,
            new Date(Date.parse(obj.timestamp as string))
        );
    }
}