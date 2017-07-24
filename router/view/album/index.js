
/* 필수 */
const router = require('express').Router();
var CONTEXT = require('../../util/context');

router.get('/:uid', function(req, res) {
    var uid = encodeURIComponent(req.params.uid);

    CONTEXT.request("http://localhost:3000/api/album/"+uid , function (error, response, body) {
        if (!error && response.statusCode == 200) {
            //있는 경우
            res.render('./pages/song_album', {
                param: req.params,
                data: JSON.parse(CONTEXT.unfetch(body))
            });
        }
        else
        {
            res.render('./pages/404');
        }
    })
});

router.get('/:uid/edit', function(req, res) {
    CONTEXT.request("http://localhost:3000/api/album/"+uid , function (error, response, body) {
        if (!error && response.statusCode == 200) {
            //있는 경우
            res.render('./pages/song_album_edit', {
                param: req.params,
                data: JSON.parse(CONTEXT.unfetch(body))
            });
        }
        else
        {
            res.render('./pages/404');
        }
    })
});

module.exports = router;