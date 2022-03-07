import { Router } from "express";
import {
  readCustomerById,
  readCustomers,
} from "../controllers/customersController.js";

const customersRouter = Router();

customersRouter.get("/customers", readCustomers);
customersRouter.get("/customers/:id", readCustomerById);

export default customersRouter;
