import { IResourceRepository } from "../ports/resource.ports";

import { APIResource } from "../enums/api.enums";
import { LogLevel } from "../enums/logging.enums";

import { MapperService } from "../mappings/mapperService";

import { LoggingService } from "../log/loggingService";

/**
 * Manages resources information
 * 
 * @class ResourceInteractor
 */
export abstract class ResourceInteractor {
    private resourceRepository: IResourceRepository;
    private mapperService: MapperService;
    private loggingService: LoggingService;

    protected resourceType: APIResource;

    /**
     * Creates an instance of ResourceInteractor
     *
     * @param {IResourceRepository} ResourceRepository
     * @param {MapperService} MapperService
     * @param {LoggingService} LoggingService
     * 
     * @memberof ResourceInteractor
     */
    constructor(
        ResourceRepository: IResourceRepository,
        MapperService: MapperService,
        LoggingService: LoggingService,
    ) {
        this.resourceRepository = ResourceRepository;
        this.mapperService = MapperService;
        this.loggingService = LoggingService;
    }

    /**
     * Retrieves a specific resource given its corresponding ID or name
     *
     * @param {string} resourceID
     * 
     * @memberof ResourceInteractor
     */
    public async getResource(resourceID: string) {
        this.loggingService.logMessage(
            LogLevel.Info,
            `Retrieving ${this.resourceType.toUpperCase()} with name or ID: ${resourceID}`,
        );

        let resourceData = null;
        let statusCode = 200;

        try {
            const resourceAPIData = await this.resourceRepository.getResourceAPIData(resourceID);

            resourceData = this.mapperService.mapResourceAPIToApplicationData(resourceAPIData);
        } catch (error) {
            statusCode = error.response.status;
        }

        return {
            statusCode,
            result: {
                data: resourceData,
                message: this.mapperService.mapErrorAPIToResourceError(statusCode, this.resourceType, resourceID),
            }
        }
    }
}
