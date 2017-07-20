const router = require('express').Router()
const request = require('request');
const Fetch = require('../../util/fetch');
var authChecker = require('../../util/context');

router.get('/form/music/:search', function (req, res) {
    var string = encodeURIComponent(Fetch.fetch(req.params.search));
    console.log(req.params.search)
    req.params.search = Fetch.unfetch(req.params.search);
    request("http://localhost:3000/search/music/"+string , function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.render('./pages/search/simple_music.ejs', {
                param: req.params,
                data: JSON.parse(body)
            });
        }
        else
        {
            res.render('./pages/404');
        }
    })
});

router.get('/form/music', function (req, res) {
    request("http://localhost:3000/search/music/", function (error, response, body) {
        if (!error && response.statusCode == 200) {
            //있는 경우
            res.render('./pages/search/simple_music.ejs', {
                param: req.params,
                data: JSON.parse(body)
            });
        }
        else
        {
            //없는 경우
            res.render('./pages/404');
        }
    })
});

router.get('/:search', function (req, res) {
    res.render('./pages/search', {
        search: req.params.search
    });
});

router.get('/', function (req, res) {
    res.render('./pages/search', {
        search: ""
    });
});

module.exports = router;