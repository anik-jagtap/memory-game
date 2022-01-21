import { json, urlencoded } from "express";
import cors from "cors";
import loadApplicationRoutes from "./routes";
export default function ({ app }) {
    app.use(cors());
    app.use(json());
    app.use(urlencoded({ extended: true }));

    //load application middleware and routes
    loadApplicationRoutes({ app });
}