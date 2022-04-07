const express = require('express');
const logger = require('../logger')
const router = express.Router();

router.get('/test-me', function (req, res) {
    console.log("the end point value is", logger.endpoint)
    res.send('My first ever api!')
    logger.logging()
});

router.get('/test-me2', function (req, res) {

    res.send('My first ever api two....!')
});
module.exports = router;
// adding this comment for no reason