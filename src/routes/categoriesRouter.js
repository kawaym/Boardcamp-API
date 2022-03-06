import { Router } from "express";

import {
  createCategory,
  readCategories,
} from "../controllers/categoriesController.js";

import validateCategorySchema from "../middlewares/validateCategorySchema.js";

const categoriesRouter = Router();

categoriesRouter.get("/categories", readCategories);
categoriesRouter.post("/categories", validateCategorySchema, createCategory);

export default categoriesRouter;
