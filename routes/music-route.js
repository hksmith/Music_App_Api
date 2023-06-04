const express = require('express');
const router = express.Router();
const music = require("../models/music");
const musicController = require("../controllers/musicController");

router.get("/", musicController.getAllMusic);
router.get("/:id", musicController.getMusic);
router.post("/",musicController.addMusic);
router.put("/:id",musicController.updateMusic);
router.delete("/:id",musicController.deleteMusic);

module.exports = router;