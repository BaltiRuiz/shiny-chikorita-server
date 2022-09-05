import { ResourceInteractor } from "./resource.interactors";

import { TypeRepository } from "../adapters/type.adapters";

import { TypeMapperService } from "../mappings/type.mapperService";

import { LoggingService } from "../log/loggingService";

import { APIResource } from "../enums/api.enums";

export class TypeInteractor extends ResourceInteractor {
    /**
     * Creates an instance of TypeInteractor
     *
     * @param {TypeRepository} TypeRepository
     * @param {TypeMapperService} TypeMapperService
     * @param {LoggingService} LoggingService
     * 
     * @memberof TypeInteractor
     */
    constructor(
        private TypeRepository: TypeRepository,
        private TypeMapperService: TypeMapperService,
        private LoggingService: LoggingService,
    ) {
        super(TypeRepository, TypeMapperService, LoggingService);

        this.resourceType = APIResource.Type;
    }
}
