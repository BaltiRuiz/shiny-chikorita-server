import axios from "axios";

import { IAbilityRepository } from "../ports/ability.ports";

export class AbilityRepository implements IAbilityRepository {
    public async getAbilitiesDetails(abilitiesMetadata: any[]): Promise<any> {
        const firstAbilityAPIResult = await axios.get(`https://pokeapi.co/api/v2/ability/${abilitiesMetadata[0].ability.name}`);

        let secondAbilityAPIData = undefined;
        let thirdAbilityAPIData = undefined;

        if (abilitiesMetadata[1]) {
            secondAbilityAPIData = await axios.get(`https://pokeapi.co/api/v2/ability/${abilitiesMetadata[1].ability.name}`);
            secondAbilityAPIData = secondAbilityAPIData.data;
        }

        if (abilitiesMetadata[2]) {
            thirdAbilityAPIData = await axios.get(`https://pokeapi.co/api/v2/ability/${abilitiesMetadata[2].ability.name}`);
            thirdAbilityAPIData = thirdAbilityAPIData.data;
        }

        return {
            firstAbilityAPIData: firstAbilityAPIResult.data,
            secondAbilityAPIData,
            thirdAbilityAPIData,
        }
    }
}
