import { PokemonMapperService } from "../mappings/pokemon.mapperService";

import { PokemonRepository } from "../adapters/pokemon.adapters";

import { ResourceInteractor } from "./resource.interactors";

import { LoggingService } from "../log/loggingService";

import { APIResource } from "../enums/api.enums";

/**
 * Manages Pokemon information
 * 
 * @class PokemonInteractor
 */
export class PokemonInteractor extends ResourceInteractor {
    /**
     * Creates an instance of PokemonInteractor
     *
     * @param {PokemonRepository} PokemonRepository
     * @param {PokemonMapperService} PokemonMapperService
     * @param {LoggingService} LoggingService
     * 
     * @memberof PokemonInteractor
     */
    constructor(
        private PokemonRepository: PokemonRepository,
        private PokemonMapperService: PokemonMapperService,
        private LoggingService: LoggingService,
    ) {
        super(PokemonRepository, PokemonMapperService, LoggingService);

        this.resourceType = APIResource.Pokemon;
    }
}
