export class HTTPError extends Error {
    protected _body: any;

    constructor(message: string, body: any) {
        super(message);
        this._body = body;
    }

    public get body(): any {
        return this._body;
    }
}