const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const newsletterSchema = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  email: { type: String },
  app: { type: String },
  web: { type: String },
  message: { type: String }
});

newsletterSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Newsletter", newsletterSchema);
