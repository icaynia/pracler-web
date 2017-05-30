const router = require('express').Router()
var request = require('request');

router.get('/', function(req, res) {
    res.render('./pages/donate/main.ejs', {
    });
});


module.exports = router;