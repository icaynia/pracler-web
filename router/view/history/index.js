const router = require('express').Router()
var request = require('request');
const Fetch = require('../../util/fetch');

router.get('/:userid', function(req, res) {
    var string = encodeURIComponent(Fetch.fetch(req.params.userid));
    
    var userid = Fetch.unfetch(req.params.userid);

    request("http://localhost:3000/api/history/"+userid , function (error, response, body) {
        if (!error && response.statusCode == 200) {
            //있는 경우
            res.render('./pages/history/simple_listview.ejs', {
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


router.get('/count/:userid', function(req, res) {
    var string = encodeURIComponent(Fetch.fetch(req.params.userid));
    
    var userid = Fetch.unfetch(req.params.userid);

    request("http://localhost:3000/api/history/count/"+userid , function (error, response, body) {
        if (!error && response.statusCode == 200) {
            //있는 경우
            res.json(JSON.parse(body).count);
        }
        else
        {
            //없는 경우
            res.render('./pages/404');
        }
    })
});

module.exports = router;