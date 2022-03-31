import * as core from 'express-serve-static-core';

const routes = (app: core.Express) => {
    app.get("/", (req, res) => {
        res.status(200).send("HELLO!");
    });
}

export default routes;
