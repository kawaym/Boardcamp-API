import { Router } from "express";
import { readCustomers } from "../controllers/customersController.js";

const customersRouter = Router();

customersRouter.get("/customers", readCustomers);

export default customersRouter;
