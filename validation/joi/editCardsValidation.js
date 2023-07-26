const Joi = require("joi");

const editCardSchema = Joi.object({
  title: Joi.string().min(2).max(256).required(),
  subTitle: Joi.string().min(2).max(256).required(),
  description: Joi.string().min(2).max(1024).required(),
  createdYear: Joi.number().min(1000).max(9999).required().messages({
    "number.base": `createdYear: Please enter a valid number.`,
    "number.integer": `createdYear: Please enter an integer (no decimal places).`,
    "number.min": `createdYear: Please enter min 4 numbers.`,
    "number.max": `createdYear: Please enter max 4 numbers.`,
    "any.required": `createdYear: This field is required.`,
  }),

  url: Joi.string()
    .allow("")
    .regex(
      new RegExp(
        /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}|[a-zA-Z0-9]+\.[^\s]{2,}|assets\/jpg")/
      )
    ),
  alt: Joi.string().allow(""),

  bizNumber: Joi.number().min(1000000).max(9999999).allow(""),
  user_id: Joi.string().hex().length(24),
});

const editValidateCardSchema = (userInput) => {
  return editCardSchema.validateAsync(userInput);
};

module.exports = {
  editValidateCardSchema,
};
