const router = require('express').Router();
const CONTEXT = require('../../util/context');
var request = require('request');

router.get('/:useruid', function(req, res) {
    var useruid = req.params.useruid;
    var view = '/'+useruid+"?mode="+req.param('mode');
    
    CONTEXT.point(req, res, view);
});

router.get('/:useruid/playlist', function(req, res) {
    var useruid = req.params.useruid;
    var view = '/'+useruid+"/playlist";
    
    CONTEXT.point(req, res, view);
});

router.put('/:username', function(req, res)
{
    edit(req,res);
});

const edit = (req, res) => {
    var username = req.params.username;
    
    request({ 
            url: "http://localhost:3000/api/user/"+username, 
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
}


module.exports = router;