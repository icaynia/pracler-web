const router = require('express').Router()
var request = require('request');
var xml2js = require('xml2js');
var parser = new xml2js.Parser();

router.get('/', function (req, res) {
    request({ 
            url: "http://www.maniadb.com/api/search/metallica/?sr=artist&display=100&key=example&v=0.5", 
            method: 'GET', 
            form: req.body
        }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                //있는 경우
                parser.parseString(body, function(err, result) {
                    var item = result.rss.channel[0].item[0];
                    for (var i in item['maniadb:majorsongs'][0].song) 
                    {
                        var iv = item['maniadb:majorsongs'][0].song[i];
                        console.log(iv.id[0] + ' ' + item.title[0] + ' - ' + iv.name[0]);
                    }
                    res.json(result.rss);
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