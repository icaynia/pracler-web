const router = require('express').Router()
var request = require('request');

router.get('/', function(req, res) {
    res.render('./pages/support/main.ejs', {
    });
});


module.exports = router;