import { APIResource } from "../enums/api.enums";

export interface IResourceRepository {
    getResourceByID(resourceName: APIResource, resourceID: string): Promise<any>;
}
