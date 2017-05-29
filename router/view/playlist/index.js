const router = require('express').Router()
var request = require('request');
const Fetch = require('../../util/fetch');

router.get('/:userid', function(req, res) {
    res.render('./pages/playlist/main.ejs', {
    });
    // request("http://localhost:3000/api/history/"+userid , function (error, response, body) {
    //     if (!error && response.statusCode == 200) {
    //         //있는 경우
            
    //     }
    //     else
    //     {
    //         //없는 경우
    //         res.render('./pages/404');
    //     }
    // })
});

module.exports = router;