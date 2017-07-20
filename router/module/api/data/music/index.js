const router = require('express').Router()
const CONTEXT = require('../../../../util/context');

router.get('/count', function (req, res) {
    CONTEXT.request({ 
        url: "http://localhost:3000/data/music/count", 
        method: 'GET', 
        form: req.body
    }, function (error, response, body) {
        if (!error && response.statusCode == 200)
        {
            res.json(body);
        }
    });
})

module.exports = router;