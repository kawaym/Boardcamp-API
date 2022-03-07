import { Router } from "express";
import { createRental, readRentals } from "../controllers/rentalsController.js";
import validateRentalSchema from "../middlewares/validateRentalSchema.js";

const rentalsRouter = Router();
rentalsRouter.get("/rentals", readRentals);
rentalsRouter.post("/rentals", validateRentalSchema, createRental);

export default rentalsRouter;
