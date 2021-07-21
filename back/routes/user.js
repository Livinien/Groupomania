const express = require('express');
const authController = require('../controllers/user');
const auth = require("../middleware/auth");

const router = express.Router();


router.post("/register", authController.register);
router.post("/login", authController.login);


router.get("/profile/:token", auth, authController.profile);

router.put("/profile/:id", auth, authController.modifyUser);

router.get("/profile/id/:id", auth, authController.profileComment);

router.delete("/profile/:id", auth, authController.deleteUser);



module.exports = router;


