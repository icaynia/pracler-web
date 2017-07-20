const router = require('express').Router();
const authChecker = require('../util/context');

router.get('/:userid', function(req, res) {
    var param = "/playlist/"+req.params.userid
    authChecker.content(req, res, param)
});

router.get('/:userid/:playlistuid', function(req, res) {
    var param = "/playlist/"+req.params.userid+"/"+req.params.playlistuid;
    authChecker.content(req, res, param)
});


module.exports = router;