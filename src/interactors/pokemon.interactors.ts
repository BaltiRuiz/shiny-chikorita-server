import { PokemonMapperService } from "../mappings/pokemon.mapperService";

import { ResourceInteractor } from "./resource.interactors";

import { APIResource } from "../enums/api.enums";

import { IResourceRepository } from "../ports/resource.ports";

/**
 * Manages Pokemon information
 * 
 * @class PokemonInteractor
 */
export class PokemonInteractor extends ResourceInteractor {
    /**
     * Creates an instance of PokemonInteractor
     *
     * @param {IResourceRepository} ResourceRepository
     * @param {PokemonMapperService} PokemonMapperService
     * 
     * @memberof PokemonInteractor
     */
    constructor(
        private ResourceRepository: IResourceRepository,
        private PokemonMapperService: PokemonMapperService,
    ) {
        super(ResourceRepository, PokemonMapperService);
    }

    /**
     * Retrieves detailed information about the abilities from a pokemon
     *
     * @param {*[]} abilitiesMetadata
     *
     * @memberof PokemonInteractor
     */
    private async getAbilitiesDetails(abilitiesMetadata: any[]) {
        const firstAbilityAPIData = await this.ResourceRepository.getResourceByID(APIResource.Ability, abilitiesMetadata[0].ability.name);

        let secondAbilityAPIData = undefined;
        let thirdAbilityAPIData = undefined;

        if (abilitiesMetadata[1]) {
            secondAbilityAPIData = await this.ResourceRepository.getResourceByID(APIResource.Ability, abilitiesMetadata[1].ability.name);
        }

        if (abilitiesMetadata[2]) {
            thirdAbilityAPIData = await this.ResourceRepository.getResourceByID(APIResource.Ability, abilitiesMetadata[2].ability.name);
        }

        return { firstAbilityAPIData, secondAbilityAPIData, thirdAbilityAPIData };
    }

    /**
     * Retrieves a specific pokemon given its corresponding ID or name
     *
     * @param {string} pokemonID
     * 
     * @memberof PokemonInteractor
     */
    public async getResource(pokemonID: string) {
        console.log(`Retrieving Pokemon with name or ID: ${pokemonID}`);

        let pokemonData = null;
        let statusCode = 200;

        try {
            const pokemonAPIData = await this.ResourceRepository.getResourceByID(APIResource.Pokemon, pokemonID);
            const speciesAPIData = await this.ResourceRepository.getResourceByID(APIResource.Species, pokemonAPIData.name);
            const abilitiesAPIData = await this.getAbilitiesDetails(pokemonAPIData.abilities);

            pokemonData = this.PokemonMapperService.mapPokemonAPIToPokemonData(pokemonAPIData, speciesAPIData, abilitiesAPIData);
        } catch (error) {
            statusCode = error.response.status;
        }

        return {
            statusCode,
            result: {
                data: pokemonData,
                message: this.PokemonMapperService.mapErrorAPIToResourceError(statusCode, APIResource.Pokemon, pokemonID),
            },
        };
    }
}
