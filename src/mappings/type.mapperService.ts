import { MapperService } from "./mapperService";

import { ITypeData, ITypeMove, ITypePokemon } from "../interfaces/type.interfaces";

export class TypeMapperService extends MapperService {
    private damageRelationAPIToTypeDamageRelation(damageRelation: Array<any>) {
        return damageRelation.map((type: any) => type.name);
    }

    public mapPokemonAPIToTypePokemon(pokemonAPIData: any): ITypePokemon {
        return {
            id: pokemonAPIData.id,
            name: pokemonAPIData.name,
            firstType: pokemonAPIData.types[0].type.name,
            secondType: pokemonAPIData.types[1] ? pokemonAPIData.types[1].type.name : undefined,
            sprite: pokemonAPIData.sprites.front_default,
        }
    }

    public mapMoveAPIToTypeMove(moveAPIData: any): ITypeMove {
        return {
            id: moveAPIData.id,
            name: moveAPIData.name,
            category: moveAPIData.damage_class.name,
            power: moveAPIData.power,
            pp: moveAPIData.pp,
            accuracy: moveAPIData.accuracy,
        }
    }

    public mapTypeAPIToTypeData(typeData: any, pokemonsDetails: ITypePokemon[], movesDetails: ITypeMove[]): ITypeData {
        return {
            id: typeData.id,
            name: typeData.name,
            damageRelations: {
                doubleDamageFrom: this.damageRelationAPIToTypeDamageRelation(typeData.damage_relations.double_damage_from),
                doubleDamageTo: this.damageRelationAPIToTypeDamageRelation(typeData.damage_relations.double_damage_to),
                halfDamageFrom: this.damageRelationAPIToTypeDamageRelation(typeData.damage_relations.half_damage_from),
                halfDamageTo: this.damageRelationAPIToTypeDamageRelation(typeData.damage_relations.half_damage_to),
                noDamageFrom: this.damageRelationAPIToTypeDamageRelation(typeData.damage_relations.no_damage_from),
                noDamageTo: this.damageRelationAPIToTypeDamageRelation(typeData.damage_relations.no_damage_to),
            },
            pokemons: pokemonsDetails,
            moves: movesDetails,
        }
    }
}
