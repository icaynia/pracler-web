const router = require('express').Router();
const authChecker = require('../util/authChecker');

router.get('/:useruid', function(req, res) {
    var useruid = req.params.useruid;
    var view = '/user/'+useruid;
    //authChecker.content(req, res, '/user/');
    res.send(useruid);
});

module.exports = router;