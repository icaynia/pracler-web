const router = require('express').Router();
const CONTEXT = require('../../util/context');

router.get('/add', function(req, res) {
    var param = "/music/add";
    CONTEXT.point(req, res, param);
});

router.get('/:uid', function(req, res) {
    var param = "/music/"+req.params.uid;
    CONTEXT.point(req, res, param);
});


module.exports = router;