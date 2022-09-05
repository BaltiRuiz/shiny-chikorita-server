import { MapperService } from "./mapperService";

import { IPokemonData, IPokemonSprites } from "../interfaces/pokemon.interfaces";

import { Languages } from "../enums/languages.enums";
import { PokemonGeneration } from "../enums/pokemon.enums";
import { PokemonStat } from "../enums/pokemon.enums";

const pokemonGamesMap: Map<PokemonGeneration, string> = new Map<PokemonGeneration, string>([
    [PokemonGeneration.GenerationI, "yellow"],
    [PokemonGeneration.GenerationII, "silver"],
    [PokemonGeneration.GenerationIII, "emerald"],
    [PokemonGeneration.GenerationIV, "platinum"],
    [PokemonGeneration.GenerationV, "black-white"],
    [PokemonGeneration.GenerationVI, "x-y"],
    [PokemonGeneration.GenerationVII, "ultra-sun-ultra-moon"],
    [PokemonGeneration.GenerationVIII, "icons"],
]);

export class PokemonMapperService extends MapperService {
    private getBaseStatByName(stats: any[], statName: PokemonStat): number {
        const stat = stats.find((stat: any) => stat.stat.name === statName);

        return stat ? stat.base_stat : 0;
    }

    private mapSpritesAPIToPokemonSprites(spritesAPI: any): Map<string, IPokemonSprites> {
        const spritesMap = new Map<string, IPokemonSprites>();

        spritesMap.set(
            "default",
            {
                default: {
                    backDefault: spritesAPI.back_default,
                    backShiny: spritesAPI.back_shiny,
                    frontDefault: spritesAPI.front_default,
                    frontShiny: spritesAPI.front_shiny,
                },
                female: {
                    backDefault: spritesAPI.back_female,
                    backShiny: spritesAPI.back_shiny_female,
                    frontDefault: spritesAPI.front_female,
                    frontShiny: spritesAPI.front_shiny_female,
                },
            },
        );

        Object.values(PokemonGeneration).forEach((generation: PokemonGeneration) => {
            const sprites = spritesAPI.versions[generation][pokemonGamesMap.get(generation)];

            spritesMap.set(
                generation,
                {
                    default: {
                        backDefault: sprites.back_default ? sprites.back_default : null,
                        backShiny: sprites.back_shiny ? sprites.back_shiny : null,
                        frontDefault: sprites.front_default ? sprites.front_default : null,
                        frontShiny: sprites.front_shiny ? sprites.front_shiny : null,
                    },
                    female: {
                        backDefault: sprites.back_female ? sprites.back_female : null,
                        backShiny: sprites.back_shiny_female ? sprites.back_shiny_female : null,
                        frontDefault: sprites.front_female ? sprites.front_female : null,
                        frontShiny: sprites.front_shiny_female ? sprites.front_shiny_female : null,
                    },
                }
            );
        });

        return spritesMap;
    }

    public mapResourceAPIToApplicationData(resourceAPIData: any): IPokemonData {
        const { pokemonAPIData, speciesAPIData, abilitiesAPIData } = resourceAPIData;

        const description = this.getEntryByLanguage(speciesAPIData.flavor_text_entries, Languages.EN, "flavor_text");

        return {
            id: pokemonAPIData.id,
            name: pokemonAPIData.name,
            types: {
                firstType: pokemonAPIData.types[0].type.name,
                secondType: pokemonAPIData.types[1] ? pokemonAPIData.types[1].type.name : undefined,
            },
            height: pokemonAPIData.height / 10,
            weight: pokemonAPIData.weight / 10,
            eggGroups: {
                firstEggGroup: speciesAPIData.egg_groups[0].name,
                secondEggGroup: speciesAPIData.egg_groups[1] ? speciesAPIData.egg_groups[1].name : undefined,
            },
            abilities: {
                firstAbility: {
                    name: abilitiesAPIData.firstAbilityAPIData.name,
                    description: this.getEntryByLanguage(abilitiesAPIData.firstAbilityAPIData.effect_entries, Languages.EN, "short_effect"),
                    hidden: pokemonAPIData.abilities[0].is_hidden,
                },
                secondAbility: abilitiesAPIData.secondAbilityAPIData ? {
                    name: abilitiesAPIData.secondAbilityAPIData.name,
                    description: this.getEntryByLanguage(abilitiesAPIData.secondAbilityAPIData.effect_entries, Languages.EN, "short_effect"),
                    hidden: pokemonAPIData.abilities[1].is_hidden,
                } : undefined,
                thirdAbility: abilitiesAPIData.thirdAbilityAPIData ? {
                    name: abilitiesAPIData.thirdAbilityAPIData.name,
                    description: this.getEntryByLanguage(abilitiesAPIData.thirdAbilityAPIData.effect_entries, Languages.EN, "short_effect"),
                    hidden: pokemonAPIData.abilities[2].is_hidden,
                } : undefined,
            },
            stats: {
                health: this.getBaseStatByName(pokemonAPIData.stats, PokemonStat.HP),
                attack: this.getBaseStatByName(pokemonAPIData.stats, PokemonStat.Attack),
                defense: this.getBaseStatByName(pokemonAPIData.stats, PokemonStat.Defense),
                specialAttack: this.getBaseStatByName(pokemonAPIData.stats, PokemonStat.SpecialAttack),
                specialDefense: this.getBaseStatByName(pokemonAPIData.stats, PokemonStat.SpecialDefense),
                speed: this.getBaseStatByName(pokemonAPIData.stats, PokemonStat.Speed),
            },
            sprites: Object.fromEntries(this.mapSpritesAPIToPokemonSprites(pokemonAPIData.sprites)),
            species: this.getEntryByLanguage(speciesAPIData.genera, Languages.EN, "genus"),
            description: description.replace(String.fromCharCode(12), " "),    // Removes special character returned by the API
        }
    }
}
