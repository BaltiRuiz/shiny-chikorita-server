import { ResourceInteractor } from "./resource.interactors";

import { TypeMapperService } from "../mappings/type.mapperService";

import { APIResource } from "../enums/api.enums";

import { IResourceRepository } from "../ports/resource.ports";

export class TypeInteractor extends ResourceInteractor {
    /**
     * Creates an instance of TypeInteractor
     *
     * @param {TypeMapperService} TypeMapperService
     * 
     * @memberof TypeInteractor
     */
    constructor(
        private ResourceRepository: IResourceRepository,
        private TypeMapperService: TypeMapperService,
    ) {
        super(ResourceRepository, TypeMapperService);
    }

    /**
     * Retrieves detailed information about the pokemons related with a type
     *
     * @param {string[]} pokemonsNames
     * 
     * @memberof TypeInteractor
     */
    private async getPokemonsDetails(pokemonsNames: string[]) {
        const promises = pokemonsNames.map(async (pokemonName: string) => {
            return await this.ResourceRepository.getResourceByID(APIResource.Pokemon, pokemonName);
        });

        const promisesResults = await Promise.all(promises);

        return promisesResults.map((promiseResult: any) => this.TypeMapperService.mapPokemonAPIToTypePokemon(promiseResult));
    }

    /**
     * Retrieves detailed information about the moves related with a type
     *
     * @param {string[]} movesNames
     * 
     * @memberof TypeInteractor
     */
    private async getMovesDetails(movesNames: string[]) {
        const promises = movesNames.map(async (moveName: string) => {
            return await this.ResourceRepository.getResourceByID(APIResource.Move, moveName);
        });

        const promisesResults = await Promise.all(promises);

        return promisesResults.map((promiseResult: any) => this.TypeMapperService.mapMoveAPIToTypeMove(promiseResult));
    }

    /**
     * Retrieves a specific type given its corresponding ID or name
     *
     * @param {string} typeID
     * 
     * @memberof TypeInteractor
     */
    public async getResource(typeID: string) {
        console.log(`Retrieving Type with name or ID: ${typeID}`);

        let typeData = null;
        let statusCode = 200;

        try {
            const typeAPIData = await this.ResourceRepository.getResourceByID(APIResource.Type, typeID);

            const relatedPokemons = typeAPIData.pokemon.map((pokemon: any) => pokemon.pokemon.name);
            const pokemonsAPIData = await this.getPokemonsDetails(relatedPokemons);

            const relatedMoves = typeAPIData.moves.map((move: any) => move.name);
            const movesAPIData = await this.getMovesDetails(relatedMoves);

            typeData = this.TypeMapperService.mapTypeAPIToTypeData(typeAPIData, pokemonsAPIData, movesAPIData);
        } catch (error) {
            statusCode = error.response.status;
        }

        return {
            statusCode,
            result: {
                data: typeData,
                message: this.TypeMapperService.mapErrorAPIToResourceError(statusCode, APIResource.Type, typeID),
            }
        }
    }
}
