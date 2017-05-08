const router = require('express').Router()
const Fetch = require('../util/fetch')

router.get('/:search', function(req, res) {
    var string = Fetch.fetch("/search/"+req.params.search)
    res.render('./layouts/layout', {
        param: string
    });
});

router.get('/', function(req, res) {
    var string = Fetch.fetch("/search/")
    res.render('./layouts/layout', {
        param: string
    });
});

module.exports = router