const router = require('express').Router();
const authChecker = require('../util/authChecker');

router.get('/', function(req, res) {
    var param = "/support"
    authChecker.content(req, res, param)
});

module.exports = router;