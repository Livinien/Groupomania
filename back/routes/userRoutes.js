const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/userCtrl");

router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
router.delete("/:id", userCtrl.deleteAccount);


module.exports = router;
