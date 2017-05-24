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


exports.nowplaying = (req, res) => {
    res.render('./pages/user/nowplaying', {});
}