import GameService from "../services/game";
const _gameService = GameService.instance();
class Game {
    static async init (req, res) {
        if (!req.body.Level) {
            return res.status(400).send({
                success: false,
                message: "Insufficient parameters!",
                data: ["Level"]
            })
        }
        const response = await _gameService.initializeGame(req.body.Level);
        if (!response.success) {
            return res.status(500).send(response);
        }
        return res.status(200).send(response);
        // res.send("starting a new game...");
    }
    static async openCard (req, res) {
        if (!req.body.GameID || !req.body.Position) {
            return res.status(400).send({
                success: false,
                message: "Insufficient parameters!",
                data: ["GameID", "Position"]
            })
        }
        const response = await _gameService.openCard(req.body.GameID, req.body.Position);
        if (!response.success) {
            return res.status(200).send(response);
        }
        return res.status(200).send(response);
    }

    static async fetchGame (req, res) {
        if (!req.params.GameID) {
            return res.status(400).send({
                success: false,
                message: "Insufficient parameters!",
                data: ["GameID"]
            })
        }
        const response = await _gameService.fetchGame(req.params.GameID);
        if (!response.success) {
            return res.status(500).send(response);
        }
        return res.status(200).send(response);
        // res.send("starting a new game...");
    }
}
export default Game;