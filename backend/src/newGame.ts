import { dbData, Game, GameState } from "./interface/game.js";
import { v4 as uuid } from 'uuid';
import { LowSync } from "lowdb";

export default function newGame(db: LowSync<dbData>): Game {
    const currentGame = {
        id: uuid(),
        state: GameState.IN_PROGRESS,
        turn: 0,
        currentPlayer: 1 as 1,
        winner: null,
        board: [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ]
    };

    db.data![currentGame.id] = currentGame;

    db.write()

    return currentGame;
}