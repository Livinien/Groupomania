const express = require("express");
const router = express.Router();
const profileCtrl = require("../controllers/profileCtrl");
const auth = require("../middleware/jwt").auth;
const multer = require('../middleware/multer-config');


// ROUTES POUR POSTER L'IMAGE //

router.post("/", auth, multer, profileCtrl.postImage);
router.get("/", auth, profileCtrl.getProfile);



// ROUTES POUR POSTER LE PRÉNOM ET LA DESCRIPTION //

router.put("/", auth, multer, profileCtrl.modifyBiography);




module.exports = router;
