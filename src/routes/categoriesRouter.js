import { Router } from "express";

import { readCategories } from "../controllers/categoriesController.js";

const categoriesRouter = Router();

categoriesRouter.get("/categories", readCategories);

export default categoriesRouter;
