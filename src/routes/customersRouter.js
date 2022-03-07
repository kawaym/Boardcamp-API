import { Router } from "express";
import {
  createCustomer,
  readCustomerById,
  readCustomers,
  updateCustomer,
} from "../controllers/customersController.js";

import validateCustomerSchema from "../middlewares/validateCustomerSchema.js";

const customersRouter = Router();

customersRouter.get("/customers", readCustomers);
customersRouter.get("/customers/:id", readCustomerById);
customersRouter.post("/customers", validateCustomerSchema, createCustomer);
customersRouter.put("/customers/:id", validateCustomerSchema, updateCustomer);

export default customersRouter;
