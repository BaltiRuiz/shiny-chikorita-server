import axios from "axios";

import { APIResource } from "../enums/api.enums";

export class ResourceService {
    public async getResourceByID(resourceType: APIResource, resourceID: string) {
        const resourceAPIResult = await axios.get(`https://pokeapi.co/api/v2/${resourceType}/${resourceID}`);

        return resourceAPIResult.data;
    }

    public async getResourcesByIDs(resourceType: APIResource, resourcesIDs: string[]) {
        const promises = resourcesIDs.map(async (resourceID: string) => {
            return await this.getResourceByID(resourceType, resourceID);
        });

        return await Promise.all(promises);
    }
}
