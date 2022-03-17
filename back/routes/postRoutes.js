const express = require("express");
const router = express.Router();
const postCtrl = require("../controllers/postCtrl");
const auth = require("../middleware/jwt").auth;
const multer = require('../middleware/multer-config');


router.post("/", auth, multer, postCtrl.createPost);
router.put("/:id", auth, multer, postCtrl.modifyPost);
router.get("/", auth, postCtrl.getAllPost);
router.delete("/:id", auth, postCtrl.deletePost);
router.post("/:id/like", auth, postCtrl.likePost);
router.get("/:id/liked", auth, postCtrl.likedPost);



module.exports = router;
