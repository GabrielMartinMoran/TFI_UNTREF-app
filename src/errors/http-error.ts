export class HTTPError extends Error {
    protected _body: object;

    constructor(message: string, body: object) {
        super(message);
        this._body = body;
    }

    public get body() {
        return this._body;
    }
}