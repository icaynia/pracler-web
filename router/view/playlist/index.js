const router = require('express').Router()
var request = require('request');
const Fetch = require('../../util/fetch');
var authChecker = require('../../util/context');

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
        
            getView(req,res);
        
    }
});
router.get('/:userid/:playlistuid', function(req, res) {
    authChecker.check(req, function(frv) {
        getView(req,res);
    }, function() {

    })
});

router.get('/add', function(req, res) {
    authChecker.check(req, function(frv) {
        res.render('./pages/playlist/add', {});
    }, function() {

    })
});

function getView(req, res)
{
    var userid = req.params.userid;
    var playlistuid = req.params.playlistuid;

    request("http://localhost:3000/api/playlist/"+userid+"/list/5" , function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var list = JSON.parse(body);
            if (!req.params.playlistuid) {
                playlistuid = list[0].uid;
            }
            authChecker.check(req, function(frv) {
            res.render('./pages/playlist/main', {
                data:
                {
                    auth: frv,
                    nickname: userid,
                    playlist: list,
                    uid: playlistuid
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

module.exports = router;