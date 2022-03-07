import { Router } from "express";

import { createGame, readGames } from "../controllers/gamesController.js";
import validateGameSchema from "../middlewares/validateGameSchema.js";

const gamesRouter = Router();

gamesRouter.get("/games", readGames);
gamesRouter.post("/games", validateGameSchema, createGame);

export default gamesRouter;
