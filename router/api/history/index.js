const router = require('express').Router()
var request = require('request');


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

module.exports = router;