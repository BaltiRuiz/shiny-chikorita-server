import { PokemonType } from "../enums/pokemon.enums";

export interface IAbilityPokemon {
    id: string;
    name: string;
    firstType: PokemonType;
    secondType?: PokemonType;
    sprite: string | null;
    firstAbility: string;
    secondAbility?: string;
    thirdAbility?: string;
}

export interface IAbilityData {
    id: string;
    name: string;
    generation: string;
    shortDescription: string;
    description: string;
    pokemons: Array<IAbilityPokemon>;
}
