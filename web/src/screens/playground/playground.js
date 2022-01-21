import GameService from "../../services/gameService";
const _gameService = GameService.instance;
class PlaygroundController {
    game;
    error;
    async fetchGame (GameID) {
        const response = await _gameService.fetchGame(GameID);
        if (!response.success) {
            this.error = response.message
            return;
        }
        response.data.board.map((item, index) => {
            item.isFlipped = item.isMarked || (response.data.lastCard == (index + 1)) || false;
            return item;
        });
        this.game = response.data;
    }

    async openCard(CardNumber) {
        const response = await _gameService.openCard(this.game.gameID, CardNumber);
        // if (!response.success) {
        //     this.error = response.message
        //     return;
        // }
        response.data.board.map((item, index) => {
            item.isFlipped = item.isMarked || (response.data.lastCard == (index + 1)) || false;
            return item;
        });
        this.game = response.data;
    }
}
export default PlaygroundController;