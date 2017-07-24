const router = require('express').Router()
var request = require('request');
const CONTEXT = require('../../../util/context');


router.put('/updateDescription', function (req, res) {
    request({ 
            url: "http://localhost:3000/api/music/updateDescription", 
            method: 'PUT', 
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

router.put('/edit/:artist/:album/:music', function (req, res) {
    var artist_encode = encodeURIComponent(req.params.artist);
    var album_encode = encodeURIComponent(req.params.album);
    var title_encode = encodeURIComponent(req.params.music);
    
    var string = CONTEXT.fetch(artist_encode+"/"+album_encode+"/"+title_encode);

    request({ 
        url: "http://localhost:3000/song/"+string, 
        method: 'PUT', 
        form: req.body
    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.send({result:1});
        }
        else
        {
            res.send({result:0});
        }
    });
})

module.exports = router;