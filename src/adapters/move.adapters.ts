import { IResourceRepository } from "../ports/resource.ports";

import { ResourceService } from "../resource/resourceService";

import { APIResource } from "../enums/api.enums";

export class MoveRepository implements IResourceRepository {
    /**
     * Creates an instance of MoveRepository
     *
     * @param {ResourceService} ResourceService
     * 
     * @memberof MoveRepository
     */
    constructor(
        private ResourceService: ResourceService,
    ) {}

    /**
     * Retrieves a specific move given its corresponding ID or name
     * 
     * @param {string} resourceID
     * 
     * @memberof MoveRepository
     */
    public async getResourceAPIData(resourceID: string): Promise<any> {
        const moveAPIData = await this.ResourceService.getResourceByID(APIResource.Move, resourceID);
        const moveTargetAPIData = await this.ResourceService.getResourceByID(APIResource.MoveTarget, moveAPIData.target.name);

        const relatedPokemonsNames = moveAPIData.learned_by_pokemon.map((pokemon: any) => pokemon.name);
        const relatedPokemonsAPIData = await this.ResourceService.getResourcesByIDs(APIResource.Pokemon, relatedPokemonsNames);

        return {
            moveAPIData,
            moveTargetAPIData,
            relatedPokemonsAPIData,
        }
    }
}