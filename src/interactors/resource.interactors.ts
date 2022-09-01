import { IResourceRepository } from "../ports/resource.ports";
import { MapperService } from "../mappings/mapperService";

/**
 * Manages resources information
 * 
 * @class ResourceInteractor
 */
export abstract class ResourceInteractor {
    /**
     * Creates an instance of ResourceInteractor
     *
     * @param {IResourceRepository} ResourceRepository
     * @param {MapperService} MapperService
     * 
     * @memberof ResourceInteractor
     */
    constructor(
        ResourceRepository: IResourceRepository,
        MapperService: MapperService
    ) {}

    /**
     * Retrieves a specific pokemon given its corresponding ID or name
     *
     * @param {string} resourceID
     * 
     * @memberof ResourceInteractor
     */
    public abstract getResource(resourceID: string): any;
}
