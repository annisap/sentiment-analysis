const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * The Text schema we will use in our Text model
 */
const textSchema = new Schema({
  id: Number,
  polarity: String,
  content: String,
  datasetId: Number
});

/**
 * Create the Text Model based on the textSchema
 */
const Text = mongoose.model("Text", textSchema);


module.exports = Text;
