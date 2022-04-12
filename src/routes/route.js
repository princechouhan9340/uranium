const express = require('express');
const router = express.Router();
const UserModel= require("../models/userModel.js")
const UserController= require("../controllers/userController")
const bookModel= require("../booklibrary/booklibrary")
const bookauthor = require("../controllers/bookauthor")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/createUser", UserController.createUser  )

router.get("/getUsersData", UserController.getUsersData)

router.post("/booklibrary", bookauthor.createbook  )

router.get("/getbookData", bookauthor.getbookData)

module.exports = router;