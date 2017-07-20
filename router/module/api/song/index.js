const router = require('express').Router();
var request = require('request');
const Fetch = require('../../util/fetch')


router.get('/image/:artist/:album', function (req, res) {

    var artist = encodeURIComponent(req.params.artist);
    var album = encodeURIComponent(req.params.album);

    var url = (Fetch.fetch("http://localhost:3000/api/song/image/"+artist+"/"+album));
    console.log(url);
    request({ 
            url: url, 
            method: 'GET', 
            form: req.body
        }, function (error, response, body) {
            console.log(body);
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

router.get('/playsource/:artist/:album/:title', function (req, res) {
    
    var artist = encodeURIComponent(req.params.artist);
    var album = encodeURIComponent(req.params.album);
    var title = encodeURIComponent(req.params.title);

    var url = (Fetch.fetch("http://localhost:3000/api/song/playsource/"+artist+"/"+album+"/"+title));
    
    request({
        url : url,
        method: 'GET',
    }, function (error, response, body) {
        res.json(JSON.parse(body));
    })
})

module.exports = router;