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
export async function readCustomerById(req, res) {
  const id = req.params.id;

  try {
    const customer = (
      await connection.query(`
      SELECT * FROM customers
      WHERE customers.id=${id}
    `)
    ).rows[0];
    if (customer) {
      res.send(customer).status(200);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
