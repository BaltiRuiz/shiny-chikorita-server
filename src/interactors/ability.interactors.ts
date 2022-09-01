import { ResourceInteractor } from "./resource.interactors";

import { AbilityMapperService } from "../mappings/ability.mapperService";

import { APIResource } from "../enums/api.enums";

import { IResourceRepository } from "../ports/resource.ports";

export class AbilityInteractor extends ResourceInteractor {
    /**
     * Creates an instance of AbilityInteractor
     *
     * @param {AbilityMapperService} AbilityMapperService
     * 
     * @memberof AbilityInteractor
     */
    constructor(
        private ResourceRepository: IResourceRepository,
        private AbilityMapperService: AbilityMapperService,
    ) {
        super(ResourceRepository, AbilityMapperService);
    }

    /**
     * Retrieves detailed information about the pokemons related with an ability
     *
     * @param {string[]} pokemonsNames
     * 
     * @memberof AbilityInteractor
     */
    private async getPokemonsDetails(pokemonsNames: string[]) {
        const promises = pokemonsNames.map(async (pokemonName: string) => {
            return await this.ResourceRepository.getResourceByID(APIResource.Pokemon, pokemonName);
        });

        const promisesResults = await Promise.all(promises);

        return promisesResults.map((promiseResult: any) => this.AbilityMapperService.mapPokemonAPIToAbilityPokemon(promiseResult));
    }

    /**
     * Retrieves a specific type given its corresponding ID or name
     *
     * @param {string} abilityID
     * 
     * @memberof AbilityInteractor
     */
    public async getResource(abilityID: string) {
        console.log(`Retrieving Ability with name or ID: ${abilityID}`);

        let abilityData = null;
        let statusCode = 200;

        try {
            const abilityAPIData = await this.ResourceRepository.getResourceByID(APIResource.Ability, abilityID);

            const relatedPokemons = abilityAPIData.pokemon.map((pokemon: any) => pokemon.pokemon.name);
            const pokemonsAPIData = await this.getPokemonsDetails(relatedPokemons);

            abilityData = this.AbilityMapperService.mapAbilityAPIToAbilityData(abilityAPIData, pokemonsAPIData);
        } catch (error) {
            statusCode = error.response.status;
        }

        return {
            statusCode,
            result: {
                data: abilityData,
                message: this.AbilityMapperService.mapErrorAPIToResourceError(statusCode, APIResource.Ability, abilityID),
            }
        }
    }
}
