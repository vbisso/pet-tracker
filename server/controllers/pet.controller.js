const Pet = require("../models/pet.model");

//gets all pets
exports.getPets = async (req, res) => {
  try {
    const pets = await Pet.find();
    res.status(200).json(pets);
  } catch (err) {
    res.status(500).json(err);
  }
};

//get pet by id
exports.getPetById = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    res.status(200).json(pet);
  } catch (err) {
    res.status(500).json(err);
  }
};

//create pet
exports.createPet = async (req, res) => {
  try {
    const pet = new Pet(req.body);
    const saved = await pet.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json(err);
  }
};

//update pet
exports.updatePet = async (req, res) => {
  try {
    const updated = await Pet.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ message: "Pet not found" });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json(err);
  }
};

//delete pet
exports.deletePet = async (req, res) => {
  try {
    const deleted = await Pet.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Pet not found" });
    res.json({ message: "Pet deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
};
