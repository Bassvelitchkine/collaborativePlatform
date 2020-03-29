const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const downloadSchema = mongoose.Schema({
  title: { type: String, required: true, unique: true },
  script: { type: Number },
  audio: { type: Number }
});

downloadSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Download", downloadSchema);
