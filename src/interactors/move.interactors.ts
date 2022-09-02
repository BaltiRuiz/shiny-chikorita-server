import { ResourceInteractor } from "./resource.interactors";

import { IResourceRepository } from "../ports/resource.ports";

import { MoveMapperService } from "../mappings/move.mapperService";

import { APIResource } from "../enums/api.enums";

export class MoveInteractor extends ResourceInteractor {
    /**
     * Creates an instance of MoveInteractor
     *
     * @param {IResourceRepository} ResourceRepository
     * @param {MoveMapperService} MoveMapperService
     * 
     * @memberof MoveInteractor
     */
    constructor(
        private ResourceRepository: IResourceRepository,
        private MoveMapperService: MoveMapperService,
    ) {
        super(ResourceRepository, MoveMapperService);
    }

    /**
     * Retrieves detailed information about the move target related with a move
     *
     * @param {string} moveTargetName
     * 
     * @memberof MoveInteractor
     */
    private async getMoveTargetDetails(moveTargetName: string) {
        const moveTargetAPIData = await this.ResourceRepository.getResourceByID(APIResource.MoveTarget, moveTargetName);

        return this.MoveMapperService.mapMoveTargetAPIToMoveTarget(moveTargetAPIData);
    }

    /**
     * Retrieves detailed information about the pokemons related with a move
     *
     * @param {string[]} pokemonsNames
     * 
     * @memberof MoveInteractor
     */
    private async getPokemonsDetails(pokemonsNames: string[]) {
        const promises = pokemonsNames.map(async (pokemonName: string) => {
            return await this.ResourceRepository.getResourceByID(APIResource.Pokemon, pokemonName);
        });

        const promisesResults = await Promise.all(promises);

        return promisesResults.map((promiseResult: any) => this.MoveMapperService.mapPokemonAPIToMovePokemon(promiseResult));
    }

    /**
     * Retrieves a specific move given its corresponding ID or name
     *
     * @param {string} moveID
     * 
     * @memberof MoveInteractor
     */
    public async getResource(moveID: string) {
        console.log(`Retrieving Move with name or ID: ${moveID}`);

        let moveData = null;
        let statusCode = 200;

        try {
            const moveAPIData = await this.ResourceRepository.getResourceByID(APIResource.Move, moveID);

            const targetDetails = await this.getMoveTargetDetails(moveAPIData.target.name);

            const relatedPokemons = moveAPIData.learned_by_pokemon.map((pokemon: any) => pokemon.name);
            const pokemonsDetails = await this.getPokemonsDetails(relatedPokemons);

            moveData = this.MoveMapperService.mapMoveAPIToMoveData(moveAPIData, targetDetails, pokemonsDetails);
        } catch (error) {
            statusCode = error.response.status;
        }

        return {
            statusCode,
            result: {
                data: moveData,
                message: this.MoveMapperService.mapErrorAPIToResourceError(statusCode, APIResource.Move, moveID),
            }
        }
    }
}
