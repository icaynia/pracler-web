const router = require('express').Router();
const authChecker = require('../util/authChecker');

router.get('/:userid', function(req, res) {
    var param = "/playlist/"+req.params.userid
    authChecker.content(req, res, param)
});


module.exports = router;