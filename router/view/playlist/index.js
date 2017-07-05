const router = require('express').Router()
var request = require('request');
const Fetch = require('../../util/fetch');
var authChecker = require('../../util/authChecker');

router.get('/:userid', function(req, res) {
    var userid = req.params.userid;

    // new
    if (userid == "new")
    {
        authChecker.check(req, function(frv) {
            res.render('./pages/playlist/add', {});
        }, function() {

        })
    }
    // user
    else
    {
        request("http://localhost:3000/api/playlist/"+userid+"/list/5" , function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var list = JSON.parse(body);
                authChecker.check(req, function(frv) {
                res.render('./pages/playlist/main', {
                    data:
                    {
                        auth: frv,
                        nickname: userid,
                        playlist: list
                    }
                });
            }, function() {

                res.render('./pages/playlist/main', {
                    data:
                    {
                        auth: "",
                        nickname: userid,
                        playlist: list
                    }
                });
            })
            }
            else
            {
                res.render('./pages/404');
            }
        })
        
    }
});

router.get('/add', function(req, res) {
    authChecker.check(req, function(frv) {
        res.render('./pages/playlist/add', {});
    }, function() {

    })
});

module.exports = router;