const router = require('express').Router();
const CONTEXT = require('../../../util/context');

router.put('/edit/:artist', function (req, res) {
    var artist_encode = encodeURIComponent(req.params.artist);
    
    var string = CONTEXT.fetch(artist_encode);

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
});

module.exports = router;