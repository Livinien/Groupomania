const express = require("express");
const router = express.Router();
const postCtrl = require("../controllers/postCtrl");
const auth = require("../middleware/jwt").auth;
const multer = require('../middleware/multer-config');


router.post("/", auth, multer, postCtrl.createPost);
router.put("/:id", auth, multer, postCtrl.modifyPost);
router.get("/:id", auth, postCtrl.getOnePost);
router.get("/", auth, postCtrl.getAllPost);
router.delete("/:id", auth, postCtrl.deletePost);


module.exports = router;
