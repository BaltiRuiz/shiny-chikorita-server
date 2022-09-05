import { ResourceInteractor } from "./resource.interactors";

import { AbilityRepository } from "../adapters/ability.adapters";

import { AbilityMapperService } from "../mappings/ability.mapperService";

import { LoggingService } from "../log/loggingService";

import { APIResource } from "../enums/api.enums";

export class AbilityInteractor extends ResourceInteractor {
    /**
     * Creates an instance of AbilityInteractor
     *
     * @param {AbilityRepository} AbilityRepository
     * @param {AbilityMapperService} AbilityMapperService
     * @param {LoggingService} LoggingService
     * 
     * @memberof AbilityInteractor
     */
    constructor(
        private AbilityRepository: AbilityRepository,
        private AbilityMapperService: AbilityMapperService,
        private LoggingService: LoggingService,
    ) {
        super(AbilityRepository, AbilityMapperService, LoggingService);

        this.resourceType = APIResource.Ability;
    }
}
