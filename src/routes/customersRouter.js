import { Router } from "express";
import {
  createCustomer,
  readCustomerById,
  readCustomers,
} from "../controllers/customersController.js";

import validateCustomerSchema from "../middlewares/validateCustomerSchema.js";

const customersRouter = Router();

customersRouter.get("/customers", readCustomers);
customersRouter.get("/customers/:id", readCustomerById);
customersRouter.post("/customers", validateCustomerSchema, createCustomer);

export default customersRouter;
