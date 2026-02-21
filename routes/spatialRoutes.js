const express = require("express");
const router = express.Router();

const spatialController = require("../controllers/spatialController");

router.post("/add", spatialController.addLocation);
router.get("/nearest", spatialController.nearest);

module.exports = router;