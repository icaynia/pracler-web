const router = require('express').Router()
const Fetch = require('../util/fetch')

router.get('/:artist/:album/:title', function(req, res) {
    var string = Fetch.fetch("/song/"+req.params.artist+"/"+req.params.album+"/"+req.params.title+"?mode="+req.param('mode'));
    res.render('./layouts/layout', {
        param: string
    });
});

router.get('/:artist/:album', function(req, res) {
    var string = Fetch.fetch("/song/"+req.params.artist+"/"+req.params.album+"?mode="+req.param('mode'))
    res.render('./layouts/layout', {
        param: string
    });
});

router.get('/:artist', function(req, res) {
    var string = Fetch.fetch("/song/"+req.params.artist+"?mode="+req.param('mode'))
    res.render('./layouts/layout', {
        param: string
    });
});

module.exports = router;