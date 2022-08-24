import { IAbilityRepository } from "../ports/ability.ports";
import { IPokemonRepository } from "../ports/pokemon.ports";
import { ISpeciesRepository } from "../ports/species.ports";

import { MapperService } from "../utils/mapperService";

/**
 * Manages Pokemon information
 * 
 * @class PokemonInteractor
 */
export class PokemonInteractor {
    /**
     * Creates an instance of PokemonInteractor
     *
     * @param {IPokemonRepository} PokemonRepository
     * 
     * @memberof PokemonInteractor
     */
    constructor(
        private PokemonRepository: IPokemonRepository,
        private SpeciesRepository: ISpeciesRepository,
        private AbilityRepository: IAbilityRepository,
        private MapperService: MapperService,
    ) {}

    /**
     * Retrieves a specific pokemon given its corresponding ID or name
     *
     * @param {number} pokemonID
     * 
     * @memberof PokemonInteractor
     */
    public async getPokemon(pokemonID: string) {
        console.log(`Retrieving Pokemon with name or ID: ${pokemonID}`);

        let pokemonData = null;
        let statusCode = 200;

        try {
            const pokemonAPIData = await this.PokemonRepository.getPokemonByID(pokemonID);
            const speciesAPIData = await this.SpeciesRepository.getSpeciesByPokemonName(pokemonAPIData.name);
            const abilitiesAPIData = await this.AbilityRepository.getAbilitiesDetails(pokemonAPIData.abilities);

            pokemonData = this.MapperService.mapPokemonAPIToPokemonData(pokemonAPIData, speciesAPIData, abilitiesAPIData);
        } catch (error) {
            statusCode = error.response.status;
        }

        return {
            statusCode,
            result: {
                data: pokemonData,
                message: this.MapperService.mapErrorAPIToPokemonError(statusCode, pokemonID),
            },
        };
    }
}
