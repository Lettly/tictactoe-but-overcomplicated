export interface Game {
    id: string;
    state: GameState;
    currentPlayer: 1 | 2;
    turn: number;
    winner: 1 | 2 | null;
    board: number[][];
}

export enum GameState { IN_PROGRESS, WINNED, DRAW }

export interface dbData {
    [key: string]: Game;
}