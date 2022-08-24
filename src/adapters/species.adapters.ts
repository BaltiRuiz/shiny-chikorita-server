import axios from "axios";

import { ISpeciesRepository } from "../ports/species.ports";

export class SpeciesRepository implements ISpeciesRepository {
    public async getSpeciesByPokemonName(pokemonName: string): Promise<any> {
        const speciesAPIResult = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`);

        return speciesAPIResult.data;
    }
}
