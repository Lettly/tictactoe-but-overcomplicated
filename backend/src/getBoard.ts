import { LowSync } from "lowdb";
import { dbData, Game } from "./interface/game.js";

export default function getBoard(db: LowSync<dbData>, gameId: string): Game {
    const currentGame = db.data![gameId];

    return currentGame;
}