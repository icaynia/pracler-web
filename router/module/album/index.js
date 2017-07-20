const router = require('express').Router();
const CONTEXT = require('../../util/context');

router.get('/:uid', function(req, res) {
    var param = "/album/"+req.params.uid;
    CONTEXT.point(req, res, param);
});


module.exports = router;