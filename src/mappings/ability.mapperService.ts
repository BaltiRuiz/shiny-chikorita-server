import { MapperService } from "./mapperService";

import { IAbilityData, IAbilityPokemon } from "../interfaces/ability.interfaces";

import { Languages } from "../enums/languages.enums";

export class AbilityMapperService extends MapperService {
    private mapPokemonAPIToAbilityPokemon(pokemonAPIData: any): IAbilityPokemon {
        return {
            id: pokemonAPIData.id,
            name: pokemonAPIData.name,
            firstType: pokemonAPIData.types[0].type.name,
            secondType: pokemonAPIData.types[1] ? pokemonAPIData.types[1].type.name : undefined,
            sprite: pokemonAPIData.sprites.front_default,
            firstAbility: pokemonAPIData.abilities[0].ability.name,
            secondAbility: pokemonAPIData.abilities[1] ? pokemonAPIData.abilities[1].ability.name : undefined,
            thirdAbility: pokemonAPIData.abilities[2] ? pokemonAPIData.abilities[2].ability.name : undefined,
        }
    }

    public mapResourceAPIToApplicationData(resourceAPIData: any): IAbilityData {
        const { abilityAPIData, relatedPokemonsAPIData } = resourceAPIData;

        const relatedPokemonsDetails = relatedPokemonsAPIData.map(
            (relatedPokemonAPIData: any) => this.mapPokemonAPIToAbilityPokemon(relatedPokemonAPIData)
        );

        return {
            id: abilityAPIData.id,
            name: abilityAPIData.name,
            generation: abilityAPIData.generation.name,
            shortDescription: this.getEntryByLanguage(abilityAPIData.effect_entries, Languages.EN, "short_effect"),
            description: this.getEntryByLanguage(abilityAPIData.effect_entries, Languages.EN, "effect"),
            pokemons: relatedPokemonsDetails,
        } 
    }
}
