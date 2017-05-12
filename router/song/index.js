const router = require('express').Router()
const Fetch = require('../util/fetch')
var request = require('request');

router.get('/:artist/:album/:title', function(req, res) {
    var string = Fetch.fetch("/song/"+req.params.artist+"/"+req.params.album+"/"+req.params.title+"?mode="+req.param('mode'));
    content(req, res, string);
});

router.get('/:artist/:album', function(req, res) {
    var string = Fetch.fetch("/song/"+req.params.artist+"/"+req.params.album+"?mode="+req.param('mode'))
    content(req, res, string);
});

router.get('/:artist', function(req, res) {
    var string = Fetch.fetch("/song/"+req.params.artist+"?mode="+req.param('mode'))
    content(req, res, string);
});

// router.get('/', function(req, res) {
//     //var string = Fetch.fetch("/song/"+req.params.artist+"?mode="+req.param('mode'))
//     //content(req, res, string);
// })

function content(req, res, param)
{
    var loggedEmail;
    checkAuth(req, function(frv) {
        loggedEmail = frv;
        res.render('./layouts/layout', {
            param: param,
            auth: loggedEmail
        });
    }, function() {

        res.render('./layouts/layout', {
            param: param,
            auth: loggedEmail
        });
    });
}

function checkAuth(req, func, nofunc)
{
    var cookie = req.cookies.frv;
    request({ 
        url: "http://localhost:3000/api/auth/check/?token="+cookie, 
        method: 'GET', 
        form: req.body
    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            //있는 경우
            func(JSON.parse(body).info.username);
        }
        else
        {
            //없는 경우
            console.log('check : false');
            nofunc(body.frv);
        }
    });
}

module.exports = router;