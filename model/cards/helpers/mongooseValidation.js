const URL = {
  type: String,
  trim: true,
};
const DEFAULT_STRING_SCHEMA = {
  type: String,
  maxLenght: 256,
  trim: true,
};
const DEFAULT_STRING_SCHEMA_REQUIRED = {
  ...DEFAULT_STRING_SCHEMA,
  required: true,
};

module.exports = {
  URL,
  DEFAULT_STRING_SCHEMA,
  DEFAULT_STRING_SCHEMA_REQUIRED,
};


