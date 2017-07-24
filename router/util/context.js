const request = require('request');
const fetch = require('./fetch.js');

function content(req, res, param)
{
    var loggedEmail = '';
    checkAuth(req, function(frv) {
        loggedEmail = frv;
        res.render('./layouts/layout', {
            param: param,
            auth: loggedEmail
        });
    }, function() {

        res.render('./layouts/layout', {
            param: param,
            auth: loggedEmail
        });
    });
}

function checkAuth(req, func, nofunc)
{
    var cookie = req.cookies.frv;
    request({ 
        url: "http://localhost:3000/api/auth/check/?token="+cookie, 
        method: 'GET', 
        form: req.body
    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            //있는 경우
            func(JSON.parse(body).info.id);
        }
        else
        {
            //없는 경우
            console.log('check : false');
            nofunc(body.frv);
        }
    });
}

exports.request = request;

exports.point = (req, res, point) =>
{
    content(req, res, point);
} 

exports.check = (req, func, nofunc) =>
{
    // deprecated 
    checkAuth(req, func, nofunc);
}

exports.fetch = (string) =>
{
    return fetch.fetch(string);
}

exports.content = (req, res, param) =>
{
    // deprecated
    content(req, res, param);
}
