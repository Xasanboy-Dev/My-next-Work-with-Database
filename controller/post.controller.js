const db = require("../db")
class PostController {
    async postPost(req, res) {
        try {
            const { title, content, userID } = req.body
            if (title !== undefined && content !== undefined) {
                const newPost = await db.query(`INSERT INTO post (title,content,user_id) VALUES ($1,$2,$3) RETURNING * `, [title, content, userID])
                res.status(201).json(newPost.rows[0])
            }
            res.status(400).json({ message: "In your DATA has a problem!" })
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
    async getPostsByUser(req, res) {
        try {
            const { id } = req.params
            const allPOsts = await db.query(`SELECT * FROM post `,)
            console.log(allPOsts.rows)
            console.log(id)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
}
module.exports = new PostController()