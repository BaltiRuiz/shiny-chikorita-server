import { Lifetime } from "awilix";
import { Sequelize } from "sequelize";

import { DependencyType, DIKeys } from "./ioc.enums";
import { IDependency } from "./ioc.interfaces";

import { PokemonInteractor } from "../interactors/pokemon.interactors";
import { TypeInteractor } from "../interactors/type.interactors";
import { MoveInteractor } from "../interactors/move.interactors";
import { AbilityInteractor } from "../interactors/ability.interactors";

import { AbilityRepository } from "../adapters/ability.adapters";
import { MoveRepository } from "../adapters/move.adapters";
import { TypeRepository } from "../adapters/type.adapters";
import { PokemonRepository } from "../adapters/pokemon.adapters";

import { ResourceService } from "../resource/resourceService";

import { PokemonMapperService } from "../mappings/pokemon.mapperService";
import { TypeMapperService } from "../mappings/type.mapperService";
import { AbilityMapperService } from "../mappings/ability.mapperService";
import { MoveMapperService } from "../mappings/move.mapperService";

import { LoggingService } from "../log/loggingService";

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
        name: DIKeys.MoveInteractor,
        instance: MoveInteractor,
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
        name: DIKeys.AbilityRepository,
        instance: AbilityRepository,
        lifetime: Lifetime.SINGLETON,
        type: DependencyType.ClassOrService,
    },
    {
        name: DIKeys.MoveRepository,
        instance: MoveRepository,
        lifetime: Lifetime.SINGLETON,
        type: DependencyType.ClassOrService,
    },
    {
        name: DIKeys.TypeRepository,
        instance: TypeRepository,
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
        name: DIKeys.ResourceService,
        instance: ResourceService,
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
        name: DIKeys.MoveMapperService,
        instance: MoveMapperService,
        lifetime: Lifetime.SINGLETON,
        type: DependencyType.ClassOrService,
    },
    {
        name: DIKeys.AbilityMapperService,
        instance: AbilityMapperService,
        lifetime: Lifetime.SINGLETON,
        type: DependencyType.ClassOrService,
    },
    {
        name: DIKeys.LoggingService,
        instance: LoggingService,
        lifetime: Lifetime.SINGLETON,
        type: DependencyType.ClassOrService,
    },
];
