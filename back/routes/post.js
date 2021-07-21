// PERMET DE DEFINIR LES ROUTES //

// LES ROUTES PERMETTANTS POUR RENDRE LE SITE DYNAMIQUE //

const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const postCtrl = require('../controllers/post');

router.post("/", auth, multer, postCtrl.createPost);
router.put("/:id", auth, multer, postCtrl.modifyPost);
router.delete("/:id", auth, postCtrl.deletePost);
router.get("/:id", auth, postCtrl.getOnePost);
router.get("/", auth, postCtrl.getAllPosts);
router.get("/userId/posts", auth, postCtrl.posts);

router.post("/:id/like", auth, postCtrl.likePost);


router.post("/:id/comments", auth, postCtrl.createComment);
router.put("/:id/comments/:idcomment", auth, postCtrl.modifyComment);
router.delete("/:id/comments/:idcomment", auth, postCtrl.deleteComment);

module.exports = router;

