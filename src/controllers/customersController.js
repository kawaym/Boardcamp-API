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
export async function createCustomer(req, res) {
  const customer = req.body;

  const customers = (await connection.query("SELECT * FROM customers")).rows;
  const existentCpf = customers.filter((c) => c.cpf === customer.cpf);
  console.log(existentCpf);
  if (existentCpf.length !== 0) {
    res.sendStatus(409);
  } else {
    try {
      await connection.query(
        `
        INSERT INTO customers (name, "phone", "cpf", "birthday")
        VALUES ($1, $2, $3, $4)
        `,
        [customer.name, customer.phone, customer.cpf, customer.birthday]
      );
      res.sendStatus(201);
    } catch {
      res.sendStatus(500);
    }
  }
}
export async function updateCustomer(req, res) {
  const customer = req.body;
  const customerId = req.params.id;

  const customers = (await connection.query("SELECT * FROM customers")).rows;
  const existentCpf = customers.filter(
    (c) => c.id !== customerId && c.cpf === customer.cpf
  );

  if (existentCpf.length !== 0) {
    res.sendStatus(409);
  } else {
    try {
      await connection.query(
        `
        UPDATE customers
        SET
          name=$1,
          phone=$2,
          cpf=$3,
          birthday=$4
        WHERE id=$5
      `,
        [
          customer.name,
          customer.phone,
          customer.cpf,
          customer.birthday,
          customerId,
        ]
      );
      res.sendStatus(200);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  }
}
