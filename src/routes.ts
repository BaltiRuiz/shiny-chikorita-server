import * as core from 'express-serve-static-core';

import { getPokemonByID } from './endpoints/pokemon.endpoints';

const routes = (app: core.Express) => {
    app.get("/pokemon/:id", getPokemonByID);
}

export default routes;
