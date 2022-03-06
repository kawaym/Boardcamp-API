import express, { json } from "express";
import cors from "cors";

import connection from "./db.js";
import router from "./routes/router.js";

const server = express();
server.use(cors());
server.use(json());
server.use(router);

server.listen(4000, () => {
  console.log("Server listening on port 4000.");
});
server.get("/categories", async (req, res) => {
  const categories = await connection.query("SELECT * FROM categories");
  res.send(categories.rows).status(200);
});
