import express, { Express, Request, Response } from 'express';
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import dotenv from 'dotenv';

import { LowSync } from 'lowdb'
import { JSONFileSync } from 'lowdb/node'
import { dbData } from './src/interface/game.js';
import newGame from './src/newGame.js';

dotenv.config();

const app: Express = express();
const port = process.env.PORT ?? 8000;

// Initialize database
const __dirname = dirname(fileURLToPath(import.meta.url));
const file = join(__dirname, 'db.json')
const adapter = new JSONFileSync<dbData>(file)
const db = new LowSync(adapter)
db.read()
db.data ||= {}

app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});

app.get('/newGame', (req: Request, res: Response) => {
    res.send(newGame(db));
});

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});