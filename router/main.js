//require('../utils/strings.js');

var request = require('request');
var ursa = require('ursa');
var fs = require('fs');
const Fetch = require('./util/fetch');
const authChecker = require('./util/context');

module.exports = function(app)
{
    app.use('/', function (req, res, next) {
        console.log('Request Url:', req.originalUrl);
        next();
    });

    app.use('/', require('./module'));
    app.use('/view', require('./view'));
}
