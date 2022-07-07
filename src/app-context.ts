import { Repository } from "./repositories/repository";

export class AppContext {

    protected repositories: Map<any, Repository>;
    protected sharedState: Map<string, any>;

    constructor(_repositories?: Map<any, Repository>, _sharedState?: Map<string, any>) {
        this.repositories = !_repositories ? new Map<any, Repository>() : _repositories;
        this.sharedState = !_sharedState ? new Map<string, any>() : _sharedState;
    }

    public getRepository(repositoryType: any): Repository {
        if (!this.repositories.has(repositoryType)) {
            this.repositories.set(repositoryType, new repositoryType());
        }
        return this.repositories.get(repositoryType)!;
    }


    public setSharedState(key: string, value: any) {
        this.sharedState.set(key, value);
    }

    public getSharedState(key: string): any {
        return this.sharedState.get(key);
    }

    public deleteSharedState(key: string) {
        if (this.sharedState.has(key)) this.sharedState.delete(key);
    }

}