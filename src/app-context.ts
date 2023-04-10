import { CONFIG } from './config';
import { ApiRepository } from './repositories/api-repository';

type LocationTitleChangeCallback = (title: string | undefined) => void;
type ShowDrawerCallback = () => void;
type SetSnackbarContentCallback = (message: string | null) => void;

export class AppContext {
    protected repositories: Map<any, ApiRepository>;
    protected sharedState: Map<string, any>;
    protected _locationTitleChangeCallback: LocationTitleChangeCallback;
    protected _showDrawerCallback: ShowDrawerCallback;
    protected _setSnackbarContentCallback: SetSnackbarContentCallback;

    constructor(_repositories?: Map<any, ApiRepository>, _sharedState?: Map<string, any>) {
        this.repositories = !_repositories ? new Map<any, ApiRepository>() : _repositories;
        this.sharedState = !_sharedState ? new Map<string, any>() : _sharedState;
        this._locationTitleChangeCallback = (title: string | undefined) => {};
        this._showDrawerCallback = () => {};
        this._setSnackbarContentCallback = (message: string | null) => {};
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

    public set showDrawerCallback(callback: ShowDrawerCallback) {
        this._showDrawerCallback = callback;
    }

    public get showDrawerCallback(): ShowDrawerCallback {
        return this._showDrawerCallback;
    }

    public set setSnackbarContentCallback(callback: SetSnackbarContentCallback) {
        this._setSnackbarContentCallback = callback;
    }

    public get setSnackbarContentCallback(): SetSnackbarContentCallback {
        return this._setSnackbarContentCallback;
    }

    public showError(message: string) {
        this._setSnackbarContentCallback(message);
        setTimeout(() => {
            this._setSnackbarContentCallback(null);
        }, CONFIG.SNACKBAR_VISIBLE_TIME);
    }
}
