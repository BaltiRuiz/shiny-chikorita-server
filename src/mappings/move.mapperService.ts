import { MapperService } from "./mapperService";

import { IMoveData, IMovePokemon, IMoveTarget } from "../interfaces/move.interfaces";
import { Languages } from "../enums/languages.enums";

export class MoveMapperService extends MapperService {
    private replaceDescriptionSpecialCharacters(description: string, effectChance: number | null): string {
        return effectChance ? description.replace("$effect_chance", effectChance.toString()) : description;
    }

    public mapMoveTargetAPIToMoveTarget(moveTargetAPIData: any): IMoveTarget {
        return {
            name: moveTargetAPIData.name,
            description: this.getEntryByLanguage(moveTargetAPIData.descriptions, Languages.EN, "description"),
        }
    }

    public mapPokemonAPIToMovePokemon(pokemonAPIData: any): IMovePokemon {
        return {
            id: pokemonAPIData.id,
            name: pokemonAPIData.name,
            firstType: pokemonAPIData.types[0].type.name,
            secondType: pokemonAPIData.types[1] ? pokemonAPIData.types[1].type.name : undefined,
            sprite: pokemonAPIData.sprites.front_default,
        }
    }

    public mapMoveAPIToMoveData(moveAPIData: any, targetDetails: IMoveTarget, pokemonsDetails: IMovePokemon[]): IMoveData {
        const effectChance = moveAPIData.effect_chance;
        const effectDescriptionAPI = this.getEntryByLanguage(moveAPIData.effect_entries, Languages.EN, "effect");
        const description = this.getEntryByLanguage(moveAPIData.flavor_text_entries, Languages.EN, "flavor_text");

        return {
            id: moveAPIData.id,
            name: moveAPIData.name,
            type: moveAPIData.type.name,
            category: moveAPIData.damage_class.name,
            generation: moveAPIData.generation.name,
            power: moveAPIData.power,
            pp: moveAPIData.pp,
            accuracy: moveAPIData.accuracy,
            target: targetDetails,
            effectChance,
            effectDescription: this.replaceDescriptionSpecialCharacters(effectDescriptionAPI, effectChance),
            description: description.replace(String.fromCharCode(12), " "),    // Removes special character returned by the API
            contestType: moveAPIData.contest_type.name,
            pokemons: pokemonsDetails,
        }
    }
}