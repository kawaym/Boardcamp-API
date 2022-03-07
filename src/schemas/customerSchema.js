import joi from "joi";

const customerSchema = joi.object({
  name: joi.string().required(),
  phone: joi
    .string()
    .regex(/[0-9]{10,11}/)
    .required(),
  cpf: joi
    .string()
    .regex(/[0-9]{11}/)
    .required(),
  birthday: joi
    .string()
    .regex(/[0-9]{4}-[0-12]{2}-[0-31]{2}/)
    .required(),
});

export default customerSchema;
