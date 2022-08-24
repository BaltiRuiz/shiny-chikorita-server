import axios from "axios";

import { IPokemonRepository } from "../ports/pokemon.ports";

export class PokemonRepository implements IPokemonRepository {
    public async getPokemonByID(pokemonID: string) {
        const pokemonAPIResult = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonID}`);

        return pokemonAPIResult.data;
    }
}
