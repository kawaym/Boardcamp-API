import { Router } from "express";
import {
  createRental,
  deleteRental,
  readRentals,
  updateRental,
} from "../controllers/rentalsController.js";
import validateRentalSchema from "../middlewares/validateRentalSchema.js";

const rentalsRouter = Router();
rentalsRouter.get("/rentals", readRentals);
rentalsRouter.post("/rentals", validateRentalSchema, createRental);
rentalsRouter.post("/rentals/:id/return", updateRental);
rentalsRouter.delete("/rentals/:id", deleteRental);

export default rentalsRouter;
