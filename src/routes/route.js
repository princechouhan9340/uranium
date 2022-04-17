const express = require('express');
const router = express.Router();


const bookController= require("../controllers/bookController")
const authercollector = require('../controllers/authorcontroller')
const publishercollector = require("../controllers/publishercontroller")
router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/createauthor", authercollector.createAuthor)
router.post("/createpublisher", publishercollector.createPublisherData)
router.post("/createbook", bookController.createBooksData)
router.put("/heardcover", bookController.heardcover)
router.put("/updateBookprice", bookController.updateBookprice)
module.exports = router;