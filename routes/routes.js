const Reouter = require("express")
const router = Reouter()

const UserController = require("../controller/controller")

router.post("/user", UserController.createUser)
router.get("/user", UserController.getUser)
router.get("/user/:id", UserController.getONeUser)
router.delete("/user/:id", UserController.deleteUser)
router.put("/user/:id", UserController.updateUser)
router.delete('/userAll', UserController.RemoveAllPerson)

module.exports = router