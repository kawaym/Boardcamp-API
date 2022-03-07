import sqlstring from "sqlstring";

import connection from "../db.js";

export async function readGames(req, res) {
  const query = req.query.name;

  let sqlQuery = "";

  if (query) {
    sqlQuery = `WHERE LOWER (name) LIKE ${sqlstring.escape(
      query.toLowerCase() + "%"
    )}`;
  }

  try {
    const games = await connection.query(`
      SELECT games.*, categories.name AS "categoryName" from games 
      JOIN categories ON games."categoryId" = categories.id  
      ${sqlQuery};  
    `);
    res.send(games.rows).status(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function createGame(req, res) {
  const game = {
    ...req.body,
    stockTotal: parseInt(req.body.stockTotal),
    pricePerDay: parseInt(req.body.pricePerDay),
  };

  const games = (await connection.query("SELECT * FROM games")).rows;
  const categories = (await connection.query("SELECT * FROM categories")).rows;

  const categoriesIds = categories.map((category) => category.id);
  const existentGame = games.filter((g) => g.name === game.name);
  if (game.name.length === 0 || !categoriesIds.includes(game.categoryId)) {
    res.sendStatus(400);
  } else if (existentGame.length !== 0) {
    res.sendStatus(409);
  } else {
    try {
      await connection.query(
        `INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") VALUES ($1, $2, $3, $4, $5)`,
        [
          game.name,
          game.image,
          game.stockTotal,
          game.categoryId,
          game.pricePerDay,
        ]
      );
      res.sendStatus(201);
    } catch (error) {
      console.log(game);
      console.log(error);
      res.sendStatus(500);
    }
  }
}
