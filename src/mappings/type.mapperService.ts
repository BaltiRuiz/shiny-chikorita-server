import { MapperService } from "./mapperService";

import { ITypeData, ITypeMove, ITypePokemon } from "../interfaces/type.interfaces";

export class TypeMapperService extends MapperService {
    private damageRelationAPIToTypeDamageRelation(damageRelation: Array<any>) {
        return damageRelation.map((type: any) => type.name);
    }

    private mapPokemonAPIToTypePokemon(pokemonAPIData: any): ITypePokemon {
        return {
            id: pokemonAPIData.id,
            name: pokemonAPIData.name,
            firstType: pokemonAPIData.types[0].type.name,
            secondType: pokemonAPIData.types[1] ? pokemonAPIData.types[1].type.name : undefined,
            sprite: pokemonAPIData.sprites.front_default,
        }
    }

    private mapMoveAPIToTypeMove(moveAPIData: any): ITypeMove {
        return {
            id: moveAPIData.id,
            name: moveAPIData.name,
            category: moveAPIData.damage_class.name,
            power: moveAPIData.power,
            pp: moveAPIData.pp,
            accuracy: moveAPIData.accuracy,
        }
    }

    public mapResourceAPIToApplicationData(resourceAPIData: any): ITypeData {
        const { typeAPIData, relatedPokemonsAPIData, relatedMovesAPIData } = resourceAPIData;

        const relatedPokemonsDetails = relatedPokemonsAPIData.map(
            (relatedPokemonAPIData: any) => this.mapPokemonAPIToTypePokemon(relatedPokemonAPIData)
        );

        const relatedMovesDetails = relatedMovesAPIData.map(
            (relatedMoveAPIData: any) => this.mapMoveAPIToTypeMove(relatedMoveAPIData)
        );

        return {
            id: typeAPIData.id,
            name: typeAPIData.name,
            damageRelations: {
                doubleDamageFrom: this.damageRelationAPIToTypeDamageRelation(typeAPIData.damage_relations.double_damage_from),
                doubleDamageTo: this.damageRelationAPIToTypeDamageRelation(typeAPIData.damage_relations.double_damage_to),
                halfDamageFrom: this.damageRelationAPIToTypeDamageRelation(typeAPIData.damage_relations.half_damage_from),
                halfDamageTo: this.damageRelationAPIToTypeDamageRelation(typeAPIData.damage_relations.half_damage_to),
                noDamageFrom: this.damageRelationAPIToTypeDamageRelation(typeAPIData.damage_relations.no_damage_from),
                noDamageTo: this.damageRelationAPIToTypeDamageRelation(typeAPIData.damage_relations.no_damage_to),
            },
            pokemons: relatedPokemonsDetails,
            moves: relatedMovesDetails,
        }
    }
}
