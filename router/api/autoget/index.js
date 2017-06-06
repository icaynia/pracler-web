const router = require('express').Router()
var request = require('request');
var xml2js = require('xml2js');
var parser = new xml2js.Parser();

router.get('/', function (req, res) {
    request({ 
            url: "http://www.maniadb.com/api/search/metallica/?sr=artist&display=10&key=example&v=0.5", 
            method: 'GET', 
            form: req.body
        }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                //있는 경우
                parser.parseString(body, function(err, result) {
                    res.json(result);
                });
            }
            else
            {
                //없는 경우
                res.send({result:0});
            }
    });
});

module.exports = router;