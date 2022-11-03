const fetch = require('node-fetch');

const url = 'http://localhost:8000';

describe('Game', () => {
    describe("Test the root path", () => {
        test("It should response the GET method", async () => {
            const result = await fetch(`${url}/`)

            expect(result.status).toBe(200);
        });
    });

    describe("Test the /newGame path", () => {
        test("It should response the GET method", async () => {
            const result = await fetch(`${url}/newGame`)

            expect(result.status).toBe(200);

            const json = await result.json();
            // {"board": [[0, 0, 0], [0, 0, 0], [0, 0, 0]], "currentPlayer": 1, "id": "652a9fa6-e55e-462b-abb7-ae6853477a68", "state": 0, "turn": 0, "winner": null}
            expect(json).toMatchObject({
                "id": expect.any(String),
                "board": expect.any(Array),
                "currentPlayer": expect.any(Number),
                "state": expect.any(Number),
                "turn": expect.any(Number),
                "winner": null,
            });

        });
    });

    describe("Test the /newMove path", () => {
        let gameId = ""
        beforeAll(async () => {
            // Reset the game state
            await new Promise(r => setTimeout(r, 200));
            const result = await fetch(`${url}/newGame`);
            const json = await result.json();
            gameId = json.id;
        });
        test("[POST] valid move", async () => {
            await new Promise(r => setTimeout(r, 200)); //TODO: remove this
            const result = await fetch(`${url}/newMove`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    gameId: gameId,
                    x: 0,
                    y: 0
                })
            })
            expect(result.status).toBe(200);

            const json = await result.json();
            expect(json).toMatchObject({
                "id": expect.any(String),
                "board": expect.any(Array),
                "currentPlayer": expect.any(Number),
                "state": expect.any(Number),
                "turn": expect.any(Number),
                "winner": null,
            });
        });

        test("[POST] invalid move", async () => {
            await new Promise(r => setTimeout(r, 200)); //TODO: remove this
            const result = await fetch(`${url}/newMove`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    gameId: gameId,
                    x: 4,
                    y: 0
                })
            })
            expect(result.status).toBe(500);
        });

        test("[POST] invalid game", async () => {
            await new Promise(r => setTimeout(r, 200)); //TODO: remove this
            const result = await fetch(`${url}/newMove`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    gameId: "invalid",
                    x: 4,
                    y: 0
                })
            })
            expect(result.status).toBe(500);
        });
    })
});