const router = require('express').Router();
const Fetch = require('../util/fetch')
var request = require('request');
//const auth = require('./auth');


router.get('/', function(req, res) {
    console.log("c");
    res.render('./pages/home');
});

router.get('/song/:artist/:album/:music', function (req, res) {
    //compute data here
    var artist_encode = encodeURIComponent(req.params.artist);
    var album_encode = encodeURIComponent(req.params.album);
    var title_encode = encodeURIComponent(req.params.music);

    var view_layout;
    switch (req.param('mode'))
    {
        case "edit":
            view_layout = './pages/song_music_edit';
            break;
        default:
            view_layout = './pages/song_music';
    }

    var string = Fetch.fetch(artist_encode+"/"+album_encode+"/"+title_encode);
    
    request("http://localhost:3000/song/"+string , function (error, response, body) {
        if (!error && response.statusCode == 200) {
            //있는 경우
            res.render(view_layout, {
                param: req.params,
                data: JSON.parse(Fetch.unfetch(body))
            });
        }
        else
        {
            res.render('./pages/404');
        }
    })
        
});


router.get('/search', function (req, res) {

    
    request("http://localhost:3000/search/music" , function (error, response, body) {
        if (!error && response.statusCode == 200) {
            //있는 경우
            res.render('./pages/search', {
                param: req.params,
                data: JSON.parse(Fetch.unfetch(body)),
                search: ""
            });
        }
        else
        {
            res.render('./pages/404');
        }
    });
});

module.exports = router;