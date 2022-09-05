export interface IResourceRepository {
    getResourceAPIData(resourceID: string): Promise<any>;
}
