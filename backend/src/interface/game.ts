export interface Game {
    id: string;
    state: GameState;
    currentPlayer: 1 | 2;
    turn: number;
    winner: 1 | 2 | null;
    board: number[][];
}

export enum GameState {
    IN_PROGRESS = 0,
    WINNED_BY_1 = 1,
    WINNED_BY_2 = 2,
    DRAW = 3,
}

export interface dbData {
    [key: string]: Game;
}