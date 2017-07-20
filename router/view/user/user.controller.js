var request = require('request');
var authChecker = require('../../util/context');
const Fetch = require('../../util/fetch');

exports.index = (req, res) => {
    var username = req.params.username;
    request("http://localhost:3000/api/user/"+username , function (error, response, body) {
        if (!error && response.statusCode == 200) {
            //있는 경우
            var mypage = false;
            authChecker.check(req, function(fsv) {
                // 프로필이 본인 것일때
                if (fsv == JSON.parse(body).id) mypage = true;
                    
                res.render('./pages/user/main', {
                        param: req.params,
                        data: JSON.parse(Fetch.unfetch(body)),
                        search: "",
                        mypage: mypage
                });
            }, function() {
                
                res.render('./pages/user/main', {
                        param: req.params,
                        data: JSON.parse(Fetch.unfetch(body)),
                        search: "",
                        mypage: mypage
                });
            })
        }
        else
        {
            res.render('./pages/404');
        }
    });
}

exports.history = (req, res) => {
    console.log('??');
    var string = encodeURIComponent(Fetch.fetch(req.params.username));
    
    var userid = Fetch.unfetch(req.params.username);

    request("http://localhost:3000/api/history/"+userid , function (error, response, body) {
        if (!error && response.statusCode == 200) {
            //있는 경우
            res.render('./pages/history/simple_listview.ejs', {
                param: req.params,
                data: JSON.parse(body)
            });
        }
        else
        {
            //없는 경우
            res.render('./pages/404');
        }
    })
}


exports.nowplaying = (req, res) => {
    request("http://localhost:3000/api/history/nowplaying/"+req.params.username , function (error, response, body) {
        if (!error && response.statusCode == 200) {

        
            //있는 경우
            res.render('./pages/user/nowplaying', {
                data: JSON.parse(body)
            });
        }
        else
        {
            res.render('./pages/404');
        }
    });
}

exports.album_popular = (req, res) => {
    console.log('c');
    request("http://localhost:3000/api/user/"+req.params.username+"/album_popular" , function (error, response, body) {
        if (!error && response.statusCode == 200) {
            //있는 경우
            res.render('./pages/user/panel/album_popular', {
                data: JSON.parse(body)
            });
        }
        else
        {
            res.render('./pages/404');
        }
    });
}

exports.history_popular = (req, res) => {
    request("http://localhost:3000/api/user/"+req.params.username+"/history_popular" , function (error, response, body) {
        if (!error && response.statusCode == 200) {
            //있는 경우
            res.render('./pages/user/panel/history_popular', {
                data: JSON.parse(body)
            });
        }
        else
        {
            res.render('./pages/404');
        }
    });
}

exports.count = (req, res) => {
    request("http://localhost:3000/api/user/"+req.params.username+"/album_popular" , function (error, response, body) {
        if (!error && response.statusCode == 200) {
            //있는 경우
            res.render('./pages/user/nowplaying', {
                data: JSON.parse(body)
            });
        }
        else
        {
            res.render('./pages/404');
        }
    });
}