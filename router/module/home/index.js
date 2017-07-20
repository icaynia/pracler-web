const router = require('express').Router();
const CONTEXT = require('../../util/context');

router.get('/', function(req, res) {
    CONTEXT.point(req, res, "/");
});

module.exports = router;