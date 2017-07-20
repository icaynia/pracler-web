const router = require('express').Router();
var request = require('request');
const Fetch = require('../../util/fetch');

router.get('/', function(req, res) {
    res.render('./pages/login', {
        title: "login"
    });
});

router.get('/:uid', function(req, res) {
    res.render('./pages/login', {
        title: "login"
    });
});

module.exports = router;