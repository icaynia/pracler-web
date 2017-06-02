var request = require('request');
var authChecker = require('../../util/authChecker');
const Fetch = require('../../util/fetch');

exports.index = (req, res) => {
    var username = req.params.username;
    if (req.param('mode') == 'edit')
    {
        request("http://localhost:3000/api/user/"+username , function (error, response, body) {
            if (!error && response.statusCode == 200) {
                //있는 경우
                var mypage = false;
                authChecker.check(req, function(fsv) {
                    // 프로필이 본인 것일때
                    if (fsv == JSON.parse(body).id) mypage = true;
                        
                    res.render('./pages/user/edit', {
                            param: req.params,
                            data: JSON.parse(Fetch.unfetch(body)),
                            search: "",
                            mypage: mypage
                    });
                }, function() {
                    
                    res.render('./pages/user/edit', {
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
    else {
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
    res.render('./pages/user/panel/history_popular', {

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