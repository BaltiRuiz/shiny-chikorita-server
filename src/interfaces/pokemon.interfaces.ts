import { PokemonEggGroup, PokemonType } from "../enums/pokemon.enums";

export interface IPokemonAbility {
    name: string;
    description: string;
    hidden: boolean;
}

export interface IPokemonSprite {
    backDefault?: string | null;
    backShiny?: string | null;
    frontDefault: string | null;
    frontShiny?: string | null;
}

export interface IPokemonSprites {
    default: IPokemonSprite;
    female: IPokemonSprite;
}

export interface IPokemonData {
    id: string;
    name: string;
    types: {
        firstType: PokemonType;
        secondType?: PokemonType;
    },
    height: number;
    weight: number;
    eggGroups: {
        firstEggGroup: PokemonEggGroup;
        secondEggGroup?: PokemonEggGroup;
    },
    abilities: {
        firstAbility: IPokemonAbility;
        secondAbility?: IPokemonAbility;
        thirdAbility?: IPokemonAbility;
    },
    stats: {
        health: number;
        attack: number;
        defense: number;
        specialAttack: number;
        specialDefense: number;
        speed: number;
    },
    sprites: any;
    species: string;
    description: string;
}
