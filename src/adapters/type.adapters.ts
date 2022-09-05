import { IResourceRepository } from "../ports/resource.ports";

import { ResourceService } from "../resource/resourceService";

import { APIResource } from "../enums/api.enums";

export class TypeRepository implements IResourceRepository {
    /**
     * Creates an instance of TypeRepository
     *
     * @param {ResourceService} ResourceService
     * 
     * @memberof TypeRepository
     */
    constructor(
        private ResourceService: ResourceService,
    ) {}

    /**
     * Retrieves a specific type given its corresponding ID or name
     *
     * @param {string} resourceID
     * 
     * @memberof TypeRepository
     */
    public async getResourceAPIData(resourceID: string): Promise<any> {
        const typeAPIData = await this.ResourceService.getResourceByID(APIResource.Type, resourceID);

        const relatedPokemonsNames = typeAPIData.pokemon.map((pokemon: any) => pokemon.pokemon.name);
        const relatedPokemonsAPIData = await this.ResourceService.getResourcesByIDs(APIResource.Pokemon, relatedPokemonsNames);

        const relatedMovesNames = typeAPIData.moves.map((move: any) => move.name);
        const relatedMovesAPIData = await this.ResourceService.getResourcesByIDs(APIResource.Move, relatedMovesNames);

        return {
            typeAPIData,
            relatedPokemonsAPIData,
            relatedMovesAPIData,
        }
    }
}