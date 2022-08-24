import "dotenv/config";
import express from "express";
import cors from "cors";

import { initIoCContainer } from "../ioc/ioc.init";
import routes from "../routes";

const PORT = process.env.PORT || 3001;

export function startServer() {
    initIoCContainer();

    const app = express();

    app.use(cors());

    routes(app);

    app.listen(PORT, () => {
        console.log(`Server listening on port: ${PORT}`);
    });
}
