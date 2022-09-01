import { Lifetime } from "awilix";
import { Sequelize } from "sequelize";

import { DependencyType, DIKeys } from "./ioc.enums";
import { IDependency } from "./ioc.interfaces";

import { PokemonInteractor } from "../interactors/pokemon.interactors";
import { TypeInteractor } from "../interactors/type.interactors";
import { AbilityInteractor } from "../interactors/ability.interactors";

import { ResourceRepository } from "../adapters/resource.adapters";

import { PokemonMapperService } from "../mappings/pokemon.mapperService";
import { TypeMapperService } from "../mappings/type.mapperService";
import { AbilityMapperService } from "../mappings/ability.mapperService";

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
        name: DIKeys.TypeInteractor,
        instance: TypeInteractor,
        lifetime: Lifetime.SINGLETON,
        type: DependencyType.ClassOrService,
    },
    {
        name: DIKeys.AbilityInteractor,
        instance: AbilityInteractor,
        lifetime: Lifetime.SINGLETON,
        type: DependencyType.ClassOrService,
    },
    {
        name: DIKeys.ResourceRepository,
        instance: ResourceRepository,
        lifetime: Lifetime.SINGLETON,
        type: DependencyType.ClassOrService,
    },
    {
        name: DIKeys.PokemonMapperService,
        instance: PokemonMapperService,
        lifetime: Lifetime.SINGLETON,
        type: DependencyType.ClassOrService,
    },
    {
        name: DIKeys.TypeMapperService,
        instance: TypeMapperService,
        lifetime: Lifetime.SINGLETON,
        type: DependencyType.ClassOrService,
    },
    {
        name: DIKeys.AbilityMapperService,
        instance: AbilityMapperService,
        lifetime: Lifetime.SINGLETON,
        type: DependencyType.ClassOrService,
    },
];
