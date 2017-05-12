const router = require('express').Router();
const authChecker = require('../util/authChecker');

router.get('/:useruid', function(req, res) {
    var useruid = req.params.useruid;
    var view = '/user/'+useruid;
    authChecker.content(req, res, '/user/'+useruid);
});

router.get('/', function (req, res) {
    res.send("<script> window.location.href = '/';</script>");
});

module.exports = router;