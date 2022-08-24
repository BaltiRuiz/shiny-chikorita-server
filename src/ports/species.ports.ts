export interface ISpeciesRepository {
    getSpeciesByPokemonName(pokemonName: string): Promise<any>;
}
