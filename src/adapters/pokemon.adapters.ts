import { IResourceRepository } from "../ports/resource.ports";

import { ResourceService } from "../resource/resourceService";

import { APIResource } from "../enums/api.enums";

export class PokemonRepository implements IResourceRepository {
    /**
     * Creates an instance of PokemonRepository
     *
     * @param {ResourceService} ResourceService
     * 
     * @memberof PokemonRepository
     */
    constructor(
        private ResourceService: ResourceService
    ) {}

    /**
     * Retrieves detailed information about the abilities from a pokemon
     *
     * @param {*[]} abilitiesMetadata
     *
     * @memberof PokemonRepository
     */
    private async getAbilitiesDetails(abilitiesMetadata: any[]) {
        const firstAbilityAPIData = await this.ResourceService.getResourceByID(APIResource.Ability, abilitiesMetadata[0].ability.name);

        let secondAbilityAPIData = undefined;
        let thirdAbilityAPIData = undefined;

        if (abilitiesMetadata[1]) {
            secondAbilityAPIData = await this.ResourceService.getResourceByID(APIResource.Ability, abilitiesMetadata[1].ability.name);
        }

        if (abilitiesMetadata[2]) {
            thirdAbilityAPIData = await this.ResourceService.getResourceByID(APIResource.Ability, abilitiesMetadata[2].ability.name);
        }

        return { firstAbilityAPIData, secondAbilityAPIData, thirdAbilityAPIData };
    }

    /**
     * Retrieves a specific pokemon given its corresponding ID or name
     *
     * @param {string} resourceID
     * 
     * @memberof PokemonRepository
     */
    public async getResourceAPIData(resourceID: string): Promise<any> {
        const pokemonAPIData = await this.ResourceService.getResourceByID(APIResource.Pokemon, resourceID);
        const speciesAPIData = await this.ResourceService.getResourceByID(APIResource.Species, pokemonAPIData.name);
        const abilitiesAPIData = await this.getAbilitiesDetails(pokemonAPIData.abilities);

        return {
            pokemonAPIData,
            speciesAPIData,
            abilitiesAPIData,
        }
    }
}