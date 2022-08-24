export enum DependencyType {
    ClassOrService,
    Resource,
}

export enum DIKeys {
    DatabaseService = "DatabaseService",

    sequelizeInstance = "sequelizeInstance",
    tableInstances = "tableInstances",

    PokemonInteractor = "PokemonInteractor",

    PokemonRepository = "PokemonRepository",
    SpeciesRepository = "SpeciesRepository",
    AbilityRepository = "AbilityRepository",

    MapperService = "MapperService",
}
