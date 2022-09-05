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
    MoveInteractor = "move",
    AbilityInteractor = "ability",

    AbilityRepository = "AbilityRepository",
    MoveRepository = "MoveRepository",
    TypeRepository = "TypeRepository",
    PokemonRepository = "PokemonRepository",

    ResourceService = "ResourceService",

    PokemonMapperService = "PokemonMapperService",
    TypeMapperService = "TypeMapperService",
    MoveMapperService = "MoveMapperService",
    AbilityMapperService = "AbilityMapperService",

    LoggingService = "LoggingService",
}
