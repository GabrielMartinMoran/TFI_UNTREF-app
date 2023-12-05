import { CONFIG } from './config';
import { MessageType } from './models/message-type';
import { ApiRepository } from './repositories/api-repository';

type LocationTitleChangeCallback = (title: string | undefined) => void;
type DrawerCallback = () => void;
type ShowSnackbarMessageCallback = (message: string | null, messageType?: MessageType) => string;
type HideSnackbarMessageCallback = (messageId: string) => void;

export class AppContext {
    protected repositories: Map<any, ApiRepository>;
    protected sharedState: Map<string, any>;
    protected _locationTitleChangeCallback: LocationTitleChangeCallback;
    protected _showDrawerCallback: DrawerCallback;
    protected _hideDrawerCallback: DrawerCallback;
    protected _isDrawerShown: boolean;
    protected _showSnackbarMessageCallback: ShowSnackbarMessageCallback;
    protected _hideSnackbarMessageCallback: HideSnackbarMessageCallback;

    constructor(_repositories?: Map<any, ApiRepository>, _sharedState?: Map<string, any>) {
        this.repositories = !_repositories ? new Map<any, ApiRepository>() : _repositories;
        this.sharedState = !_sharedState ? new Map<string, any>() : _sharedState;
        this._locationTitleChangeCallback = (title: string | undefined) => {};
        this._showDrawerCallback = () => {};
        this._hideDrawerCallback = () => {};
        this._isDrawerShown = false;
        this._showSnackbarMessageCallback = (message: string | null, messageType?: MessageType) => '';
        this._hideSnackbarMessageCallback = (messageId: string) => {};
    }

    public getRepository(repositoryType: any): ApiRepository {
        if (!this.repositories.has(repositoryType)) {
            this.repositories.set(repositoryType, new repositoryType());
        }
        return this.repositories.get(repositoryType)!;
    }

    public setSharedState(key: string, value: any) {
        this.sharedState.set(key, value);
    }

    public getSharedState(key: string): any | null {
        if (this.sharedState.has(key)) return this.sharedState.get(key);
        return null;
    }

    public deleteSharedState(key: string) {
        if (this.sharedState.has(key)) this.sharedState.delete(key);
    }

    public set locationTitleChangeCallback(callback: LocationTitleChangeCallback) {
        this._locationTitleChangeCallback = callback;
    }

    public get locationTitleChangeCallback(): LocationTitleChangeCallback {
        return this._locationTitleChangeCallback;
    }

    public set showDrawerCallback(callback: DrawerCallback) {
        this._showDrawerCallback = async () => {
            await callback();
            this._isDrawerShown = true;
        };
    }

    public get showDrawerCallback(): DrawerCallback {
        return this._showDrawerCallback;
    }

    public set hideDrawerCallback(callback: DrawerCallback) {
        this._hideDrawerCallback = () => {
            callback();
            this._isDrawerShown = false;
        };
    }

    public get hideDrawerCallback(): DrawerCallback {
        return this._hideDrawerCallback;
    }

    public get isDrawerShown(): boolean {
        return this._isDrawerShown;
    }

    public set showSnackbarMessageCallback(callback: ShowSnackbarMessageCallback) {
        this._showSnackbarMessageCallback = callback;
    }

    public get showSnackbarMessageCallback(): ShowSnackbarMessageCallback {
        return this._showSnackbarMessageCallback;
    }

    public set hideSnackbarMessageCallback(callback: HideSnackbarMessageCallback) {
        this._hideSnackbarMessageCallback = callback;
    }

    public get hideSnackbarMessageCallback(): HideSnackbarMessageCallback {
        return this._hideSnackbarMessageCallback;
    }

    public showMessage(message: string, messageType: MessageType = MessageType.DEFAULT) {
        const messageId = this._showSnackbarMessageCallback(message, messageType);
        setTimeout(() => {
            this._hideSnackbarMessageCallback(messageId);
        }, CONFIG.SNACKBAR_VISIBLE_TIME);
    }
}
