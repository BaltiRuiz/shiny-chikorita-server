import { PokemonType } from "../enums/pokemon.enums";

export interface IMovePokemon {
    id: string;
    name: string;
    firstType: PokemonType;
    secondType?: PokemonType;
    sprite: string | null;
}

export interface IMoveTarget {
    name: string;
    description: string;
}

export interface IMoveData {
    id: string;
    name: string;
    type: PokemonType;
    category: string;
    generation: string;
    power: number;
    pp: number;
    accuracy: number;
    target: IMoveTarget;
    effectChance: number | null;
    effectDescription: string;
    description: string;
    contestType: string;
    pokemons: Array<IMovePokemon>;
}
