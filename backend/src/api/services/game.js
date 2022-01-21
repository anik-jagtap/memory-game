import * as uuid from "uuid";
import fs from "fs";
import path from "path";
import RatingService from "./ratings";
import fileutils from "../../utility/fileutils";
import utility from "../../utility";
const _ratingService = RatingService.instance();
let _singleton = true;
let _instance = null;
class Game {
    constructor() {
        if (_singleton) {
            throw new Error("This is a singleton class. Please use Game.instance() instead.");
        }
    }
    static instance() {
        if (!_instance) {
            _singleton = false;
            _instance = new Game();
            _singleton = true;
        }
        return _instance;
    }

    async initializeGame(Level = "Easy") {
        let totalCards = 10;
        switch(Level.toUpperCase()) {
            case "EASY":
                totalCards = 10;
                break;
            case "MEDIUM":
                totalCards = 30;
                break;
            case "HARD":
                totalCards = 50;
                break;
        }
        const board = [];
        const randArray = utility.generateRandomArray(totalCards);
        for (let elem of randArray) {
            board.push({ key: elem, isMarked: false });
        }
        const fileId = uuid.v4();
        const gameObject = {
            board,
            startedAt: -1,
            lastCard: -1,
            matched: 0,
            totalCards,
            errorScore: -1,
            difficultyLevel: Level.toUpperCase(),
            gameID: fileId
        }
        try {
            const filePath = path.resolve(__dirname, "../../../", "game_boards", fileId + ".json");
            const fileRes = await fileutils.writeFilePromise(filePath, JSON.stringify(gameObject));
        } catch(e) {
            return {
                success: false,
                message: "Something went wrong! Please try again later.",
                data: {}
            }
        }
        return {
            success: true,
            message: "Game started",
            data: gameObject
        };
    }

    async fetchGame(GameID) {
        try {
            const filePath = path.resolve(__dirname, "../../../", "game_boards", GameID + ".json");
            const fileExists = await fileutils.existsFilePromise(filePath);
            if (!fileExists) {
                return {
                    success: false,
                    message: "Invalid GameID",
                    data: {}
                }
            }
            let content = await fileutils.readFilePromise(filePath);
            content = JSON.parse(content);
            return {
                success: true,
                message: "Game fetched successfully.",
                data: content
            }
        } catch(e) {
            console.log("error occured", e);
            return {
                success: false,
                message: "Something went wrong! Please try again later.",
                data: {}
            }
        }
    }

    async openCard(GameID, Position) {
        try {
            const filePath = path.resolve(__dirname, "../../../", "game_boards", GameID + ".json");
            const fileExists = await fileutils.existsFilePromise(filePath);
            if (!fileExists) {
                return {
                    success: false,
                    message: "Invalid GameID",
                    data: {}
                }
            }
            let errorMessage;
            let successMessage;
            let content = await fileutils.readFilePromise(filePath);
            content = JSON.parse(content);
            if (content.startedAt == -1 && content.matched == 0 && content.lastCard == -1) {
                content.startedAt = Date.now();
                content.errorScore = 0;
            }
            if (Position > content.totalCards) {
                return {
                    success: false,
                    message: "Invalid Position",
                    data: {}
                }
            } else if (content.lastCard == -1) {
                // first select
                content.lastCard = Position;
                successMessage = "Card Marked";
            } else if (content.lastCard == Position) {
                errorMessage = "Card number cannot be the same."
            } else if (content.board[content.lastCard - 1].key == content.board[Position - 1].key) {
                // second select
                content.board[content.lastCard - 1].isMarked = true;
                content.board[Position - 1].isMarked = true;
                content.lastCard = -1;
                content.matched += 1;
                successMessage = "Cards Matched";
            } else {
                content.lastCard = -1;
                content.errorScore += 1;
                errorMessage = "Keys did not matched";
            }
            if (content.matched == content.totalCards / 2) {
                // calculate score
                content.finishedAt = Date.now();
                const diff = content.finishedAt - content.startedAt;
                content.ratings = _ratingService.calculateRatings(content.difficultyLevel, diff, content.errorScore);
            }
            const fileRes = await fileutils.writeFilePromise(filePath, JSON.stringify(content));
            if (content.matched == content.totalCards / 2) {
                return {
                    success: true,
                    message: "Game Finished",
                    data: content
                }
            }
            return {
                success: !errorMessage,
                message: errorMessage || successMessage || "Success",
                data: content
            }
        } catch(e) {
            console.log("error occured", e);
            return {
                success: false,
                message: "Something went wrong! Please try again later.",
                data: {}
            }
        }
    }
}
export default Game;