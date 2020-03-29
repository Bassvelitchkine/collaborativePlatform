const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const publicationSchema = mongoose.Schema({
  title: { type: String, required: true, unique: true },
  anchor: { type: String },
  author: { type: String, required: true },
  audioAuthor: { type: String },
  description: { type: String, required: true },
  date: { type: String, required: true },
  instagram: { type: String, required: true },
  soundcloud: { type: String },
  text: { type: String, required: true },
  withAudio: { type: String, required: true },
  image: { type: String, required: true },
  pdf: { type: String, required: true },
  audio: { type: String },
  words: { type: Number, required: true }
});

publicationSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Publication", publicationSchema);
