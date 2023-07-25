const joiCardsValidation = require("./joi/cardsValidation");
const editjoiCardsValidation = require("./joi/editCardsValidation");

const validatorOption = "Joi";

const createCardValidation = (userInput) => {
  if (validatorOption === "Joi") {
    return joiCardsValidation.validateCardSchema(userInput);
  }
  throw new Error("validator undefined");
};

const editCardValidation = (userInput) => {
  if (validatorOption === "Joi") {
    return editjoiCardsValidation.editValidateCardSchema(userInput);
  }
  throw new Error("validator undefined");
};

module.exports = {
  createCardValidation,
  editCardValidation,
};
