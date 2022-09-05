import { IResourceRepository } from "../ports/resource.ports";

import { ResourceService } from "../resource/resourceService";

import { APIResource } from "../enums/api.enums";

export class AbilityRepository implements IResourceRepository {
    /**
     * Creates an instance of AbilityRepository
     *
     * @param {ResourceService} ResourceService
     * 
     * @memberof AbilityRepository
     */
    constructor(
        private ResourceService: ResourceService,
    ) {}

    /**
     * Retrieves a specific ability given its corresponding ID or name
     *
     * @param {string} resourceID
     * 
     * @memberof AbilityRepository
     */
    public async getResourceAPIData(resourceID: string): Promise<any> {
        const abilityAPIData = await this.ResourceService.getResourceByID(APIResource.Ability, resourceID);

        const relatedPokemonsNames = abilityAPIData.pokemon.map((pokemon: any) => pokemon.pokemon.name);
        const relatedPokemonsAPIData = await this.ResourceService.getResourcesByIDs(APIResource.Pokemon, relatedPokemonsNames);

        return {
            abilityAPIData,
            relatedPokemonsAPIData,
        }
    }
}