export interface IPokemonRepository {
    getPokemonByID(pokemonID: string): Promise<any>;
}
