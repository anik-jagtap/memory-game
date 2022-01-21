import express from "express";
import GameController from "../controllers/game";
const GameRouter = express.Router();
export default function({ app }) {
    GameRouter.post("/init", GameController.init);
    GameRouter.post("/card/open", GameController.openCard);
    GameRouter.get("/:GameID", GameController.fetchGame);
    app.use("/game", GameRouter);
}