const router = require('express').Router();
//const auth = require('./auth');


router.get('/song/:artist/:album/:title', function(req, res) {
    console.log("c");
    var string = fetch("/song/"+req.params.artist+"/"+req.params.album+"/"+req.params.title+"?mode="+req.param('mode'));
    res.render('./layouts/layout', {
        param: string
    });
});

router.get('/song/:artist/:album', function(req, res) {
    var string = fetch("/song/"+req.params.artist+"/"+req.params.album+"?mode="+req.param('mode'))
    res.render('./layouts/layout', {
        param: string
    });
});

router.get('/song/:artist', function(req, res) {
    var string = fetch("/song/"+req.params.artist+"?mode="+req.param('mode'))
    res.render('./layouts/layout', {
        param: string
    });
});

module.exports = router;