const router = require('express').Router();
var request = require('request');
const Fetch = require('../../util/fetch');

router.get('/add', function (req, res) {
    //compute data here
    res.render('./pages/add/music', {
        title: ""
    });
});


router.get('/:uid', function (req, res) {
    //compute data here
    var uid = encodeURIComponent(req.params.uid);

    var view_layout;
    switch (req.param('mode'))
    {
        case "edit":
            view_layout = './pages/song_music_edit';
            break;
        case "description":
            view_layout = './pages/song/description';
            break;
        default:
            view_layout = './pages/song_music';
    }
        
    request("http://localhost:3000/api/music/"+uid , function (error, response, body) {
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

router.get('/:uid/edit', function (req, res) {
    
});

router.get('/:uid/edit/description', function (req, res) {
    
});


module.exports = router;