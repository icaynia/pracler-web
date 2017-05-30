const router = require('express').Router()
const Fetch = require('../util/fetch')
const authChecker = require('../util/authChecker');

router.get('/', function(req, res) {
    var param = "/donate"
    authChecker.content(req, res, param)
});

router.get('/music', function(req, res) {
    var param = "/add/music"
    authChecker.content(req, res, param)
});

module.exports = router;


