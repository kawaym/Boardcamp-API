import sqlstring from "sqlstring";

import connection from "../db.js";

export async function readCustomers(req, res) {
  const query = req.query.cpf;

  let sqlQuery = "";

  if (query) {
    sqlQuery = `WHERE name LIKE ${sqlstring.escape(query + "%")}`;
  }

  try {
    const customers = await connection.query(`
      SELECT * FROM customers
      ${sqlQuery}
      `);
    res.send(customers.rows).status(200);
  } catch {
    res.sendStatus(500);
  }
}
