import { Lifetime } from "awilix";
import { Sequelize } from "sequelize";

import { DependencyType, DIKeys } from "./ioc.enums";
import { IDependency } from "./ioc.interfaces";

import { PokemonInteractor } from "../interactors/pokemon.interactors";

import { PokemonRepository } from "../adapters/pokemon.adapters";
import { SpeciesRepository } from "../adapters/species.adapters";
import { AbilityRepository } from "../adapters/ability.adapters";

import { MapperService } from "../utils/mapperService";

/**
 * IoC definition
 */
export const IoCConfiguration: IDependency[] = [
    {
        name: DIKeys.sequelizeInstance,
        instance: Sequelize,
        lifetime: Lifetime.TRANSIENT,
        type: DependencyType.Resource,
    },
    {
        name: DIKeys.PokemonInteractor,
        instance: PokemonInteractor,
        lifetime: Lifetime.SINGLETON,
        type: DependencyType.ClassOrService,
    },
    {
        name: DIKeys.PokemonRepository,
        instance: PokemonRepository,
        lifetime: Lifetime.SINGLETON,
        type: DependencyType.ClassOrService,
    },
    {
        name: DIKeys.SpeciesRepository,
        instance: SpeciesRepository,
        lifetime: Lifetime.SINGLETON,
        type: DependencyType.ClassOrService,
    },
    {
        name: DIKeys.AbilityRepository,
        instance: AbilityRepository,
        lifetime: Lifetime.SINGLETON,
        type: DependencyType.ClassOrService,
    },
    {
        name: DIKeys.MapperService,
        instance: MapperService,
        lifetime: Lifetime.SINGLETON,
        type: DependencyType.ClassOrService,
    },
];
