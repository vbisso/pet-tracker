const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema(
  {
    petId: { type: mongoose.Schema.Types.ObjectId, ref: "Pet", required: true },
    type: { type: String, required: true },
    description: { type: String },
    date: { type: String },
    vet: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Record", recordSchema);
