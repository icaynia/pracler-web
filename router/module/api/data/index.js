const router = require('express').Router()
var request = require('request');
router.use('/music', require('./music'));

module.exports = router;