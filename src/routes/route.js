const express = require('express');
const router = express.Router();
const logger = require("../logger/logger")
const util = require("../util/helper")
const validator = require("../validator/formatter")
const _= require('lodash');
const { fromPairs } = require('lodash');

router.get('/test-me1', function (req, res) {
    res.send('Welcome to my application.1');
    logger.myfunction();
});

router.get('/test-me2', function (req, res) {
    
    res.send('Welcome to my application. 2');
    util.newDate();
    util.newMonth();
    util.getBatchinfo();
});

router.get('/test-me3', function (req, res) {
    res.send('Welcome to my application.3');
    validator.trimfunction();
    validator.changetoLowerCase();
    validator.changetoUpperCase();
});




router.get('/hello', function (req, res) {
    res.send('Welcome to my application.4');
    let monthName = ["jan","feb","march","april","may","june","july","aug","sep","oct","nov","dec"];
    console.log(_.chunk(monthName,4))

    let oddNumber = [1,3,5,7,9,11,13,15,17,19]
    console.log(_.tail(oddNumber));

});

module.exports = router;
// adding this comment for no reason