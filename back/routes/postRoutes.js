const express = require("express");
const router = express.Router();
const postCtrl = require("../controllers/postCtrl");
const auth = require("../middleware/jwt").auth;


router.post("/", auth, postCtrl.createPost);
router.get("/:id", auth, postCtrl.getOnePost);
router.get("/", auth, postCtrl.getAllPost);
router.put("/:id", auth, postCtrl.modifyPost);
router.delete("/:id", auth, postCtrl.deletePost);




module.exports = router;
