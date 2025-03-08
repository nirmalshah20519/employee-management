import Joi from "joi";

export const employeeSchema = Joi.object({
  id: Joi.number().optional(),
  name: Joi.string().required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  verified: Joi.boolean().required(),
  managerId: Joi.number().required(),
  deviceIds: Joi.array().items(Joi.number()),
}).unknown(true); // allows extra properties without validation errors;

export interface Employee {
  id?: number;
  name: string;
  email: string;
  verified: boolean;
  managerId: number;
  deviceIds: number[];
}
