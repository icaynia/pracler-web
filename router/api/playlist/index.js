const router = require('express').Router()
var request = require('request');


router.post('/add/:listname', function (req, res) {
    var listname = req.params.listname;
    request({ 
            url: "http://localhost:3000/api/playlist/add/"+listname, 
            method: 'POST', 
            form: req.body
        }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                //있는 경우
                res.send(body);
            }
            else
            {
                //없는 경우
                res.send({result:0});
            }
    });
});

module.exports = router;