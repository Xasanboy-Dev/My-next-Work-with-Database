const express = require("express")
const app = express()
const userRouter = require("./routes/routes")
const PostController = require("./routes/post.toutes")
const PORT = process.env.PORT || 8080
app.use(express.json())
app.use("/api", userRouter)
app.use("/api", PostController)
app.listen(PORT, () => {
    console.log(`Server: http://localhost:${PORT}`)
})