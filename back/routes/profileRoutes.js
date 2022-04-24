const express = require("express");
const router = express.Router();
const profileCtrl = require("../controllers/profileCtrl");
const auth = require("../middleware/jwt").auth;
const multer = require('../middleware/multer-config');


router.post("/", auth, multer, profileCtrl.postImage);
router.get("/", auth, profileCtrl.getImage);



module.exports = router;
