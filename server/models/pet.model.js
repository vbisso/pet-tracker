const mongoose = require("mongoose");

const petSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    species: { type: String, required: true },
    breed: { type: String },
    birthdate: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Pet", petSchema);
