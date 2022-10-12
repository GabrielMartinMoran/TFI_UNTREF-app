import { ApiRepository } from './repositories/api-repository';

export class AppContext {
    protected repositories: Map<any, ApiRepository>;
    protected sharedState: Map<string, any>;

    constructor(_repositories?: Map<any, ApiRepository>, _sharedState?: Map<string, any>) {
        this.repositories = !_repositories ? new Map<any, ApiRepository>() : _repositories;
        this.sharedState = !_sharedState ? new Map<string, any>() : _sharedState;
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
}
