const express = require("express");
const router = express.Router();
const commentCtrl = require("../controllers/commentCtrl");
const auth = require("../middleware/jwt").auth;
const multer = require('../middleware/multer-config');



router.post("/", auth, multer, commentCtrl.createComment);
router.get("/:id", auth, commentCtrl.getAllComment);


module.exports = router;
