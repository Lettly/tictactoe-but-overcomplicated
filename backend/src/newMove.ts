import { LowSync } from "lowdb";
import { dbData, Game, GameState } from "./interface/game.js";
import { Move } from "./interface/move.js";

export default function newMove(db: LowSync<dbData>, req: Move): Game {
    const currentGame = db.data![req.gameId];
    if (currentGame.state !== GameState.IN_PROGRESS) {
        throw new Error('Game is not in progress, or does not exist');
    }

    //check if it's the right player	
    if (currentGame.currentPlayer !== req.player) {
        throw new Error('Not your turn');
    }

    //check if the move is valid
    if (currentGame.board[req.x][req.y] !== 0) {
        throw new Error('Invalid move, cell already taken');
    }

    //update the board
    currentGame.board[req.x][req.y] = req.player;

    //check if the game is won
    if (currentGame.board[req.x][0] === req.player && currentGame.board[req.x][1] === req.player && currentGame.board[req.x][2] === req.player) {
        currentGame.state = GameState.WINNED;
        currentGame.winner = req.player;
    }
    if (currentGame.board[0][req.y] === req.player && currentGame.board[1][req.y] === req.player && currentGame.board[2][req.y] === req.player) {
        currentGame.state = GameState.WINNED;
        currentGame.winner = req.player;
    }
    if (currentGame.board[0][0] === req.player && currentGame.board[1][1] === req.player && currentGame.board[2][2] === req.player) {
        currentGame.state = GameState.WINNED;
        currentGame.winner = req.player;
    }
    if (currentGame.board[0][2] === req.player && currentGame.board[1][1] === req.player && currentGame.board[2][0] === req.player) {
        currentGame.state = GameState.WINNED;
        currentGame.winner = req.player;
    }

    //check if the game is draw
    if (currentGame.turn === 8) {
        currentGame.state = GameState.DRAW;
    }

    //update the game
    currentGame.currentPlayer = req.player === 1 ? 2 : 1;
    currentGame.turn++;

    db.write();

    return currentGame;
}