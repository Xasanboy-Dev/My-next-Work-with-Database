const Reouter = require("express")
const router = Reouter()

const PostController = require("../controller/post.controller")

router.post("/post", PostController.postPost)
router.get("/post/:id", PostController.getPostsByUser)

module.exports = router