const router = require('express').Router();
var authChecker = require('../../util/context');

router.get('/', function(req, res) {
    authChecker.check(req, function(frv) {
        res.render('./pages/song/main', {});
    }, function() {

    })
});

module.exports = router;