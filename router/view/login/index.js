const router = require('express').Router();
var request = require('request');
const Fetch = require('../../util/fetch');

router.get('/', function (req, res) {
    //compute data here
    res.render('./pages/login', {
        title: "login"
    });
});

module.exports = router;