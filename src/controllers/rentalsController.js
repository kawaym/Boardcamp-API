import sqlstring from "sqlstring";

import connection from "../db.js";

export async function readRentals(req, res) {
  const customerIdQuery = req.query.customerID;
  const gameIdQuery = req.query.gameId;

  let sqlQuery = "";

  if (customerIdQuery && !gameIdQuery) {
    sqlQuery = `WHERE "customerId"=${sqlstring.escape(customerIdQuery)}`;
  } else if (gameIdQuery && !customerIdQuery) {
    sqlQuery = `WHERE "gameId"=${sqlstring.escape(gameIdQuery)}`;
  } else if (gameIdQuery && customerIdQuery) {
    sqlQuery = `WHERE "customerId"=${sqlstring.escape(
      customerIdQuery
    )} AND "gameId"=${sqlstring.escape(gameIdQuery)}`;
  }
  try {
    const pureRentals = (
      await connection.query(`
    SELECT * FROM rentals
    ${sqlQuery}
  `)
    ).rows;
    const customerInfo = await connection.query(`
      SELECT * FROM customers
      WHERE id=${pureRentals.customerId}
    `);
    const gameInfo = await connection.query(`
      SELECT * FROM games
      WHERE id=${pureRentals.gameId}
    `);

    const rentals = {
      ...pureRentals,
      customer: customerInfo.rows[0],
      game: gameInfo.rows[0],
    };

    res.send(rentals).status(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
