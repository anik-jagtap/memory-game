import express from "express";
import config from "./config";
import runLoaders from "./loaders";
const app = express();

function startServer () {
    runLoaders({ app });
    app.listen(config.PORT, () => {
        console.log(`Application running at ${config.HOST}:${config.PORT}`);
    })
}

startServer();