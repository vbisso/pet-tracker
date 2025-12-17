const Record = require("../models/record.model");

//gets all records by pet id
exports.getRecordsByPetId = async (req, res) => {
  try {
    const records = await Record.find({ petId: req.params.petId });
    res.json(records);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching records", error: err.message });
  }
};

//get record by record id
exports.getRecordById = async (req, res) => {
  try {
    const record = await Record.findById(req.params.id);
    if (!record) return res.status(404).json({ message: "Record not found" });
    res.json(record);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching record", error: err.message });
  }
};

//create record
exports.createRecord = async (req, res) => {
  try {
    const record = new Record(req.body);
    const saved = await record.save();
    res.status(201).json(saved);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error creating record", error: err.message });
  }
};

//update record
exports.updateRecord = async (req, res) => {
  try {
    const updated = await Record.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ message: "Record not found" });
    res.json(updated);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error updating record", error: err.message });
  }
};

//delete record
exports.deleteRecord = async (req, res) => {
  try {
    const deleted = await Record.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Record not found" });
    res.json({ message: "Record deleted" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting record", error: err.message });
  }
};
