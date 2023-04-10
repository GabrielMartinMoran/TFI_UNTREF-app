export type BuildRouteParams = { [key: string]: string };

export type RouteParams = {
    path: string;
    component: React.FC<any>;
    title?: string;
};

export class Route {
    protected _path: string;
    protected _component: React.FC<any>;
    protected _title?: string;

    public constructor({ path, component, title = undefined }: RouteParams) {
        this._path = path;
        this._component = component;
        this._title = title;
    }

    public get path(): string {
        return this._path;
    }

    public get component(): React.FC<any> {
        return this._component;
    }

    public get title(): string | undefined {
        return this._title;
    }

    public buildPath(params: BuildRouteParams = {}): string {
        if (!params) return this.path;
        let path = this.path;
        for (const param of Object.keys(params)) {
            path = path.replaceAll(param, params[param]);
        }
        return path;
    }
}
