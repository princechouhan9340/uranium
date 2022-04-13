const express = require('express');
const router = express.Router();
// const UserModel= require("../models/userModel.js")

const BookController= require("../controllers/bookcollection")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/inputBook", BookController.inputBook  )

// P-1  === RETURN NUMBERS OF BOOK DATA 
router.get("/getBooksData", BookController.getBooksData)




module.exports = router;