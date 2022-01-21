import HttpService from "./httpService";
let _singleton = true;
let _instance;
const _httpService = HttpService.instance;
class GameService {
    constructor(){
        if(_singleton){
            throw new SyntaxError('This is a singleton class. Please use GameService.instance instead!');
        }        
    }

    static get GET () { return "get"; }
    static get POST () { return "post"; }
    static get PUT () { return "put"; }

    static get instance(){
        if (!_instance) {
            _singleton = false;
            _instance = new GameService();
            _singleton = true;
        }
        return _instance;
    }

    async startGame(Level = "medium") {
        return await _httpService.requestServer(HttpService.POST, "/game/init", { Level });
    }

    async fetchGame(GameID) {
        return await _httpService.requestServer(HttpService.GET, `/game/${GameID}`, null);
    }

    async openCard(GameID, CardNumber) {
        return await _httpService.requestServer(HttpService.POST, "/game/card/open", { GameID, Position: CardNumber  })
    }

}
export default GameService;