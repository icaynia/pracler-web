const router = require('express').Router()
const Fetch = require('../util/fetch')

router.get('/artist', function(req, res) {
    var string = Fetch.fetch("/add/artist");
    res.render('./layouts/layout', {
        param: string
    });
});

router.get('/album', function(req, res) {
    var string = Fetch.fetch("/add/album");
    res.render('./layouts/layout', {
        param: string
    });
});

router.get('/music', function(req, res) {
    var string = Fetch.fetch("/add/music");
    res.render('./layouts/layout', {
        param: string
    });
});

module.exports = router;


