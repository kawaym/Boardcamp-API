import connection from "../db.js";

export async function readCategories(req, res) {
  try {
    const categories = await connection.query("SELECT * FROM categories");
    res.send(categories.rows).status(200);
  } catch {
    res.sendStatus(500);
  }
}

export async function createCategories(req, res) {
  const categoryName = req.body.name;

  if (categoryName.length === 0) {
    res.sendStatus(400);
  }
}
