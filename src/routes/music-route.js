const express = require('express');
const router = express.Router();
const musicController = require("../controllers/musicController");
const multer = require("../middleware/multer");

router.get("/", musicController.getAllMusic);
router.get("/:id", musicController.getMusic);
router.post("/",multer.upload.single('image'), musicController.addMusic);
router.put("/:id",multer.upload.single('image'), musicController.updateMusic);
router.delete("/:id",musicController.deleteMusic);

module.exports = router;