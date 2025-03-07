import Joi from "joi";

export const serviceSchema = Joi.object({
  Id: Joi.number(),
  ServiceType: Joi.string().required().messages({
    "string.empty": "Service Type is required",
  }),
  SubType: Joi.string().required().messages({
    "string.empty": "Service Sub Type is required",
  }),
  PerKmPrice: Joi.number().positive().required().messages({
    "number.base": "Per KM Price must be a number",
    "number.positive": "Per KM Price must be greater than zero",
    "any.required": "Per KM Price is required",
  }),
  PerKgPrice: Joi.number().positive().allow(null).messages({
    "number.base": "Per KG Price must be a number",
    "number.positive": "Per KG Price must be greater than zero",
    // 'any.required': 'Per KG Price is required',
  }),
  PerMinPrice: Joi.number().positive().allow(null).messages({
    "number.base": "Per Minute Price must be a number",
    "number.positive": "Per Minute Price must be greater than zero",
    // "any.required": "Per Minute Price is required",
  }),
  Description: Joi.string().required().messages({
    "string.empty": "Description is required",
  }),
  Image: Joi.any().required().meta({ swaggerType: "file" }).messages({
    "any.required": "Image is required",
  }),
  createdAt: Joi.string(),
  updatedAt: Joi.string(),
});

export interface Service {
  Id?: number;
  ServiceType: string;
  SubType: string;
  PerKmPrice: string;
  PerKgPrice: string | null;
  PerMinPrice: string;
  Description: string;
  Image: any;
  CreatedAt?: string;
  UpdatedAt?: string;
}
