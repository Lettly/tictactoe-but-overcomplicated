import { LowSync } from "lowdb";
import { dbData, Game, GameState } from "./interface/game.js";
import { Move } from "./interface/move.js";

export default function newMove(db: LowSync<dbData>, req: Move): Game {
    const currentGame = db.data![req.gameId];
    if (currentGame.state !== GameState.IN_PROGRESS) {
        throw new Error('Game is not in progress, or does not exist');
    }

    //check if the move is valid
    if (currentGame.board[req.x][req.y] !== 0) {
        throw new Error('Invalid move, cell already taken');
    }

    //update the board
    currentGame.board[req.x][req.y] = currentGame.currentPlayer;

    //check if the game is won
    if (currentGame.board[req.x][0] === currentGame.currentPlayer && currentGame.board[req.x][1] === currentGame.currentPlayer && currentGame.board[req.x][2] === currentGame.currentPlayer) {
        currentGame.state = currentGame.currentPlayer;
        currentGame.winner = currentGame.currentPlayer;
    }
    if (currentGame.board[0][req.y] === currentGame.currentPlayer && currentGame.board[1][req.y] === currentGame.currentPlayer && currentGame.board[2][req.y] === currentGame.currentPlayer) {
        currentGame.state = currentGame.currentPlayer;
        currentGame.winner = currentGame.currentPlayer;
    }
    if (currentGame.board[0][0] === currentGame.currentPlayer && currentGame.board[1][1] === currentGame.currentPlayer && currentGame.board[2][2] === currentGame.currentPlayer) {
        currentGame.state = currentGame.currentPlayer;
        currentGame.winner = currentGame.currentPlayer;
    }
    if (currentGame.board[0][2] === currentGame.currentPlayer && currentGame.board[1][1] === currentGame.currentPlayer && currentGame.board[2][0] === currentGame.currentPlayer) {
        currentGame.state = currentGame.currentPlayer;
        currentGame.winner = currentGame.currentPlayer;
    }

    //check if the game is draw
    if (currentGame.turn === 8) {
        currentGame.state = GameState.DRAW;
    }

    //update the game
    currentGame.currentPlayer = currentGame.currentPlayer === 1 ? 2 : 1;
    currentGame.turn++;

    db.write();

    return currentGame;
}