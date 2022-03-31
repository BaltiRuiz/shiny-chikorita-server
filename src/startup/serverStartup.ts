import "dotenv/config";
import express from "express";

import routes from "../routes";

const PORT = process.env.PORT || 3001;

export function startServer() {
    const app = express();

    routes(app);

    app.listen(PORT, () => {
        console.log(`Server listening on port: ${PORT}`);
    });
}
