const router = require('express').Router()
const Fetch = require('../util/fetch')
const authChecker = require('../util/context');

router.get('/music', function(req, res) {
    var param = "/add/music"
    authChecker.content(req, res, param)
});

module.exports = router;


