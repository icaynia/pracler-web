const router = require('express').Router()
var request = require('request');
const Fetch = require('../../util/fetch');


router.post('/add', function (req, res) {
    request({ 
            url: "http://localhost:3000/api/history/add", 
            method: 'POST', 
            form: req.body
        }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                //있는 경우
                res.send({result:1});
            }
            else
            {
                //없는 경우
                res.send({result:0});
            }
    });
});

router.get('/:userid', function (req, res) {
    request({ 
            url: "http://localhost:3000/api/history/"+req.params.userid, 
            method: 'GET', 
            form: req.body
        }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                //있는 경우
                res.json(JSON.parse(body));
            }
            else
            {
                //없는 경우
                res.send({result:0});
            }
    });
});

router.get('/count/music/:artist/:album/:music', function (req, res) {
    var string = encodeURIComponent(Fetch.fetch(req.params.artist+"/"+req.params.album+"/"+req.params.music));
    request({ 
            url: "http://localhost:3000/api/history/count/music/"+req.params.artist+"/"+req.params.album+"/"+req.params.music, 
            method: 'GET', 
            form: req.body
        }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                //있는 경우
                console.log(body);
                res.json(JSON.parse(body));
            }
            else
            {
                //없는 경우
                res.send({result:0});
            }
    });
});

// 인증 필요
router.put('/delete/:oid', function(req, res) {
    request({
        url: "http://localhost:3000/api/history/delete/"+req.params.oid, 
        method: 'PUT'
    }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                //있는 경우
                res.json(JSON.parse(body));
            }
            else
            {
                //없는 경우
                res.send({result:0});
            }
    });
})

module.exports = router;