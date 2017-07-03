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
        authChecker.check(req, function(frv) {
            res.render('./pages/playlist/main', {
                data:
                {
                    nickname: frv
                }
            });
        }, function() {

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