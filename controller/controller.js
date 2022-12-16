const db = require("../db")
const { all } = require("../routes/routes")
class UserController {
    async createUser(req, res) {
        try {
            const allPerons = await (await db.query(`SELECT * FROM person`)).rows
            const { name, surname } = req.body
            let arr = []
            for (let r in allPerons) {
                let d = allPerons[r]
                if (d.name == name && d.surname == surname) {
                    arr.push(d)
                }
            }
            if (arr.length == 0) {
                const newPerson = await db.query(`INSERT INTO person (name,surname) VALUES ($1,$2) RETURNING *`, [name, surname])
                res.status(201).json({ message: "Peron has added!" })
            } else {
                res.status(400).json({ message: "Your DATA is already exist!" })
            }
        } catch (error) {
            res.json({ message: error.message })
        }
    }
    async getUser(req, res) {
        try {
            const Users = await db.query(`SELECT * FROM person`)
            res.status(200).json(Users.rows)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
    async updateUser(req, res) {
        let { id } = req.params
        const thisPerson = await db.query(`SELECT * FROM person WHERE id = $1`, [id])
        if (id !== undefined) {
            const { name, surname } = req.body
            await db.query(`UPDATE person SET name = $1, surname = $2  WHERE id = $3 RETURNING *`, [name ? name : thisPerson.name, surname ? surname : thisPerson.surname])
        }
        res.status(400).json({ message: "In your DATA has a problem!" })
    }
    async deleteUser(req, res) {
        try {
            await db.query(`DELETE FROM person WHERE id = $1`, [req.params.id])
            res.send("DATA has deleted")
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
    async getONeUser(req, res) {
        try {
            const byId = await db.query(`SELECT * FROM person WHERE id = $1`, [req.params.id])
            res.status(200).json(byId.rows[0])
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
    async RemoveAllPerson(req, res) {
        try {
            const deleted = await db.query(`DELETE FROM person`)
            res.status(200).send("All person has DELETED")
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
}

module.exports = new UserController()