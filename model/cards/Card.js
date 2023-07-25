const mongoose = require("mongoose");
const Image = require("./Image");
const {
  URL,
  DEFAULT_STRING_SCHEMA_REQUIRED,
  DEFAULT_STRING_SCHEMA,
} = require("./helpers/mongooseValidation");

const cardSchema = new mongoose.Schema({
  title: DEFAULT_STRING_SCHEMA_REQUIRED,
  subTitle: DEFAULT_STRING_SCHEMA_REQUIRED,
  description: { ...DEFAULT_STRING_SCHEMA_REQUIRED, maxLength: 1024 },
  createdYear: {
    type: Number,
    minLength: 4,
    maxLength: 4,
    required: true,
    trim: true,
  },
  web: URL,
  image: Image,

  bizNumber: {
    type: Number,
    minLength: 7,
    maxLength: 7,
    required: true,
    trim: true,
  },
  likes: [String(1)],
  createdAt: { type: Date, default: Date.now },
  user_id: { type: mongoose.Schema.Types.ObjectId },
});

const Card = mongoose.model("cards", cardSchema);

module.exports = Card;
