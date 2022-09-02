import * as core from 'express-serve-static-core';

import { getResourceByID } from './endpoints/resource.endpoints';

const routes = (app: core.Express) => {
    app.get(/(pokemon|type|move|ability)(\/(.*))?/, getResourceByID);
}

export default routes;
