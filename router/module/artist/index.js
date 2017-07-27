const router = require('express').Router();
const CONTEXT = require('../../util/context');

router.get('/:uid', function(req, res) {
    var param = "/artist/"+req.params.uid;
    CONTEXT.point(req, res, param);
});

router.get('/:uid/edit', function(req, res) {
    var param = "/artist/"+req.params.uid+"/edit";
    CONTEXT.point(req, res, param);
});


module.exports = router;