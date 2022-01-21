import loadHomeRoutes from "../api/routes/home";
import loadGameRoutes from "../api/routes/game";
export default function ({ app }) {
    // initialize all the api routes here
    loadHomeRoutes({ app });
    loadGameRoutes({ app });
}