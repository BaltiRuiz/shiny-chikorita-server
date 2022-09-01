import { PokemonType } from "../enums/pokemon.enums";

interface IDamageRelations {
    doubleDamageFrom: string[];
    doubleDamageTo: string[];
    halfDamageFrom: string[];
    halfDamageTo: string[];
    noDamageFrom: string[];
    noDamageTo: string[];
}

export interface ITypePokemon {
    id: string;
    name: string;
    firstType: PokemonType;
    secondType?: PokemonType;
    sprite: string | null;
}

export interface ITypeMove {
    id: string;
    name: string;
    category: string;
    power: number;
    pp: number;
    accuracy: number;
}

export interface ITypeData {
    id: string;
    name: string;
    damageRelations: IDamageRelations;
    pokemons: Array<ITypePokemon>;
    moves: Array<ITypeMove>;
}
