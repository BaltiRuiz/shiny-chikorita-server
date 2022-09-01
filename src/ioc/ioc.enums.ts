export enum DependencyType {
    ClassOrService,
    Resource,
}

export enum DIKeys {
    DatabaseService = "DatabaseService",

    sequelizeInstance = "sequelizeInstance",
    tableInstances = "tableInstances",

    PokemonInteractor = "pokemon",
    TypeInteractor = "type",
    AbilityInteractor = "ability",

    ResourceRepository = "ResourceRepository",

    PokemonMapperService = "PokemonMapperService",
    TypeMapperService = "TypeMapperService",
    AbilityMapperService = "AbilityMapperService",
}
