const router = require("express").Router();
const auth = require("../middleware/authmiddleware");
const postC = require("../controllers/postcontroller");

router.post("/create", auth, postC.createPost);
router.get("/feed", auth, postC.getFeed);
router.post("/:id/like", auth, postC.toggleLike);
router.get("/:id", auth, postC.getPostById);
router.post("/:id/comment", auth, postC.addComment);




module.exports = router;
