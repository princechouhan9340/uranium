const express = require('express');
const router = express.Router();
const userController= require("../controllers/userController")
const user2Controller = require('../controllers/user2Controller')
const middleware = require('../middleware/commonMiddleware')
const middleware2 = require('../middleware/commonMiddleware2')

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

//---------assignment api ---------
router.post("/usercreate", user2Controller.createuser2)
router.post("/login2",user2Controller.loginUser)
router.get('/users/:userId',middleware.auth, user2Controller.getdata)
router.put("/users/:userId",middleware.auth, user2Controller.updateUser)
router.put("/users2/:userId",middleware2.auth2, user2Controller.userpost)
router.delete("/users/:userId", user2Controller.deleteapi)





router.post("/users", userController.createUser  )

router.post("/login", userController.loginUser)

//The userId is sent by front end
router.get("/users/:userId", userController.getUserData)

router.put("/users/:userId", userController.updateUser)

module.exports = router;