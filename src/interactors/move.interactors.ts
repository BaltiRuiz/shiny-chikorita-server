import { ResourceInteractor } from "./resource.interactors";

import { MoveRepository } from "../adapters/move.adapters";

import { MoveMapperService } from "../mappings/move.mapperService";

import { LoggingService } from "../log/loggingService";

import { APIResource } from "../enums/api.enums";

export class MoveInteractor extends ResourceInteractor {
    /**
     * Creates an instance of MoveInteractor
     *
     * @param {MoveRepository} MoveRepository
     * @param {MoveMapperService} MoveMapperService
     * @param {LoggingService} LoggingService
     * 
     * @memberof MoveInteractor
     */
    constructor(
        private MoveRepository: MoveRepository,
        private MoveMapperService: MoveMapperService,
        private LoggingService: LoggingService,
    ) {
        super(MoveRepository, MoveMapperService, LoggingService);

        this.resourceType = APIResource.Move;
    }
}
