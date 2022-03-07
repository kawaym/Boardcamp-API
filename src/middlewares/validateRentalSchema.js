import rentalSchema from "../schemas/rentalSchema.js";

export default function validateRentalSchema(req, res, next) {
  const rental = req.body;

  const validation = rentalSchema.validate(rental);
  if (validation.error) {
    return res.sendStatus(422);
  }

  next();
}
