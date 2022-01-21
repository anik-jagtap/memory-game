import GameService from "../../services/gameService";
const _gameService = GameService.instance;
class HomeController {
    async initiateGame (level) {
        return await _gameService.startGame(level);
        
    }
}
export default HomeController;