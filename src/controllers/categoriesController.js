import connection from "../db.js";

export async function readCategories(req, res) {
  try {
    const categories = await connection.query("SELECT * FROM categories");
    res.send(categories.rows).status(200);
  } catch {
    res.sendStatus(500);
  }
}

export async function createCategory(req, res) {
  const categoryName = req.body.name;
  const categories = (await connection.query("SELECT * FROM categories")).rows;

  if (categoryName.length === 0) {
    res.sendStatus(400);
  } else if (categories.includes(categoryName)) {
    res.sendStatus(409);
  } else {
    try {
      await connection.query("INSERT INTO categories (name) VALUES ($1)", [
        categoryName,
      ]);
      res.sendStatus(201);
    } catch {
      res.sendStatus(500);
    }
  }
}
