const express = require("express");
const router = express.Router();
const recordController = require("../controllers/record.controller");

router.get("/pet/:petId", recordController.getRecordsByPetId);
router.get("/:id", recordController.getRecordById);
router.post("/", recordController.createRecord);
router.put("/:id", recordController.updateRecord);
router.delete("/:id", recordController.deleteRecord);

module.exports = router;
