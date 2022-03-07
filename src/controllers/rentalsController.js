import sqlstring from "sqlstring";
import dayjs from "dayjs";

import connection from "../db.js";

export async function readRentals(req, res) {
  const customerIdQuery = req.query.customerID;
  const gameIdQuery = req.query.gameId;

  const customers = (await connection.query(`SELECT * FROM customers`)).rows;
  const games = (await connection.query(`SELECT * FROM games`)).rows;

  const gameExists = games.filter((g) => g.id === gameIdQuery);
  const customerExists = customers.filter((c) => c.id === customerIdQuery);

  if (!gameExists || !customerExists) {
    res.sendStatus(404);
  }

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

    const rentals = pureRentals.map((item) => {
      const customerInfo = customers.filter((c) => c.id === item.customerId)[0];
      const gameInfo = games.filter((g) => g.id === item.gameId)[0];

      return { ...item, customer: customerInfo, game: gameInfo };
    });
    res.send(rentals).status(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
export async function createRental(req, res) {
  const gameRented = (
    await connection.query(`
      SELECT * FROM games
      WHERE id=${req.body.gameId}
  `)
  ).rows[0];
  const existentConsumer = (
    await connection.query(`
      SELECT * FROM customers
      WHERE id=${req.body.customerId}
    `)
  ).rows[0];

  const gameQuantityInStock = gameRented.stockTotal;
  const gameQuantityRented = await connection.query(`
    SELECT* FROM rentals
    WHERE "gameId"=${req.body.gameId}
    `);
  const greaterThanStock = !(gameQuantityRented < gameQuantityInStock);

  if (!existentConsumer || !gameRented || greaterThanStock) {
    res.sendStatus(400);
    return;
  }
  const rental = {
    ...req.body,
    rentDate: dayjs().format("YYYY-MM-DD"),
    originalPrice: req.body.daysRented * gameRented.pricePerDay,
    returnDate: null,
    delayFee: null,
  };
  try {
    await connection.query(
      `
      INSERT INTO rentals
      ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee")
      VALUES ($1, $2, $3, $4, $5, $6, $7)
    `,
      [
        rental.customerId,
        rental.gameId,
        rental.rentDate,
        rental.daysRented,
        rental.returnDate,
        rental.originalPrice,
        rental.delayFee,
      ]
    );
    res.sendStatus(200);
  } catch {
    res.sendStatus(500);
  }
}
