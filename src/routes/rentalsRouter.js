import { Router } from "express";
import { readRentals } from "../controllers/rentalsController.js";

const rentalsRouter = Router();
rentalsRouter.get("/rentals", readRentals);

export default rentalsRouter;
