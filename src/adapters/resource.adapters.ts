import axios from "axios";

import { IResourceRepository } from "../ports/resource.ports";

import { APIResource } from "../enums/api.enums";

export class ResourceRepository implements IResourceRepository {
    public async getResourceByID(resourceName: APIResource, resourceID: string) {
        const pokemonAPIResult = await axios.get(`https://pokeapi.co/api/v2/${resourceName}/${resourceID}`);

        return pokemonAPIResult.data;
    }
}
