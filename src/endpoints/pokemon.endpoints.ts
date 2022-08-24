import { Request, Response } from "express";

import { AppContainerInstance } from '../ioc/ioc.init';
import { DIKeys } from '../ioc/ioc.enums';

import { PokemonInteractor } from "../interactors/pokemon.interactors";

export const getPokemonByID = async (req: Request, res: Response) => {
    const pokemonID = req.params.id;

    const pokemonInteractor: PokemonInteractor = AppContainerInstance.getContainerItem(
        DIKeys.PokemonInteractor,
    );

    const endpointResult = await pokemonInteractor.getPokemon(pokemonID);

    res.status(endpointResult.statusCode).send(endpointResult.result);
}
