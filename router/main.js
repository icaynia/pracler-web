//require('../utils/strings.js');

var request = require('request');
var ursa = require('ursa');
var fs = require('fs');
const Fetch = require('./util/fetch');


module.exports = function(app)
{
    var crt = ursa.createPublicKey(fs.readFileSync('utils/server.pub'));

    app.use('/api', require('./api'));
    app.use('/song', require('./song'));
    app.use('/add', require('./add'));
    app.use('/search', require('./search'));
    app.use('/view', require('./view'));

    app.get('/data/sesv', function(req, res) {
        req.session.email = "vv";
        res.json({
            session: req.session.email
        });
    });

    app.get('/data/sessiondestroy', function(req, res) {
        req.session.destroy(function(err){
            res.send("<script> window.location.href = '/';</script>");
        });
    });

    app.get('/', function(req, res) {
        content(req, res, '/')
    });

    app.use('/', function(req, res, next)
    {
        next();
    })

    app.get('/now', function(req, res) {
        res.render('./layouts/layout', {param: "/now"});
    });

    app.get('/cast', function(req, res) {
        res.render('./layouts/layout', {param: "/cast"});
    });
    // login
    app.get('/login', function(req, res) {
        res.render('./layouts/layout', {param: "/login"});
    });
    
    app.get('/add', function(req, res) {
        var string = Fetch.fetch("/add");
        res.render('./layouts/layout', {
            param: string
        });
    });

    app.get('/signup', function(req, res) {
        var string = Fetch.fetch("/signup");
        res.render('./layouts/layout', {
            param: string
        });
    });


    app.get('/data/music/count', function (req, res) {
        request("http://localhost:3000/data/music/count" , function (error, response, body) {
            if (!error && response.statusCode == 200) {
                //있는 경우
                res.json(body);
            }
            else
            {
                res.render('./pages/404');
            }
        });
    });

    app.get('/viewcall/search/music/:search', function (req, res) {
        var string = encodeURIComponent(Fetch.fetch(req.params.search));
        
        req.params.search = Fetch.unfetch(req.params.search);

        request("http://localhost:3000/search/music/"+string , function (error, response, body) {
            if (!error && response.statusCode == 200) {
                //있는 경우
                res.render('./pages/search/simple_music.ejs', {
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
    });

    
    app.get('/viewcall/search/music/', function (req, res) {
        

        request("http://localhost:3000/search/music/" , function (error, response, body) {
            if (!error && response.statusCode == 200) {
                //있는 경우
                res.render('./pages/search/simple_music.ejs', {
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
    });

    app.get('/viewcall/search/artist/:search', function (req, res) {
        console.log(req.params.search);
        var string = encodeURIComponent(fetch(req.params.search));
        
        req.params.search = Fetch.unfetch(req.params.search);

        request("http://localhost:3000/search/artist/"+string , function (error, response, body) {
            if (!error && response.statusCode == 200) {
                //있는 경우
                res.render('./pages/search/simple_artist.ejs', {
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
    });
    
    app.get('/viewcall/search/album/:search', function (req, res) {

        var string = Fetch.fetch(req.params.search);
        
        req.params.search = Fetch.unfetch(req.params.search);
        res.render('./pages/search/simple_album.ejs');
    });

    app.get('/viewcall/search/user/:search', function (req, res) {

        var string = Fetch.fetch(req.params.search);
        
        req.params.search = Fetch.unfetch(req.params.search);
        res.render('./pages/search/simple_user.ejs');
    });
    /** View
     *  
     */


    // home (/)

    

    app.get('/view/search/:search', function (req, res) {

        var string = encodeURIComponent(Fetch.fetch(req.params.search));
        
        req.params.search = Fetch.unfetch(req.params.search);
        console.log(req.params.search );

        request("http://localhost:3000/search/music/"+string , function (error, response, body) {
            if (!error && response.statusCode == 200) {
                //있는 경우
                res.render('./pages/search', {
                    param: req.params,
                    data: JSON.parse(Fetch.unfetch(body)),
                    search: req.params.search
                });
            }
            else
            {
                res.status(404).render('./pages/404');
            }
        });
    });

    app.get('/view/now', function (req, res) {
        //compute data here
        res.render('./pages/home', {
            title: "now"
        });
    });

    app.get('/view/signup', function (req, res) {
        //compute data here
        res.render('./pages/register/signup', {
            title: "now"
        });
    });

    app.get('/view/add', function (req, res) {
        //compute data here
        res.render('./pages/add/select', {
            title: "add"
        });
    });

    app.get('/view/add/artist', function (req, res) {
        //compute data here
        res.render('./pages/add/artist', {
            title: "add"
        });
    });

    app.get('/view/add/music', function (req, res) {
        //compute data here
        res.render('./pages/add/music', {
            title: ""
        });
    });

    app.get('/view/add/album', function (req, res) {
        //compute data here
        res.render('./pages/add/album', {
            title: "album"
        });
    });

    app.get('/view/login', function (req, res) {
        //compute data here
        res.render('./pages/login', {
            title: "login"
        });
    });

    app.get('/view/cast', function (req, res) {
        //compute data here
        res.render('./pages/cast', {
            title: "login"
        });
    });

    // etc
    app.get('/view/404', function (req, res) {
        res.render('./pages/404');
    });


    app.post('/signup/user', function (req, res) {
        // 더이상 사용하지 않습니다.

        // request({ 
        //     url: "http://localhost:3000/signup", 
        //     method: 'POST', 
        //     form: req.body
        // }, function (error, response, body) {
        //     if (!error && response.statusCode == 200) {
        //         //있는 경우
        //         res.send({result:1});
        //     }
        //     else
        //     {
        //         //없는 경우
        //         res.send({result:0});
        //     }
        // });

    });

    app.post('/signin/user', function (req, res) {
        // 더 이상 사용하지 않습니다.
        // request({    
        //     url: "http://localhost:3000/signin", 
        //     method: 'POST', 
        //     form: req.body
        // }, function (error, response, body) {
        //     if (!error && response.statusCode == 200) {
        //         //성공
        //         res.send({result:1});
        //         console.log("성공 : " + req.body.inputEmail);
        //         req.session.email = req.body.inputEmail;
        //         req.session.save(function() {
        //             console.log("저장 성공");
        //         });
        //         console.log("sess : " + req.session.email);
        //     }
        //     else
        //     {
        //         //실패
        //         res.send({result:0});
        //         console.log("\x1b[31m", "실패 : " + req.body.inputEmail);
        //     }
        // });
    });

    app.put('/regist/:artist/:album/:music', function (req, res) {
        //compute data here

        var artist_encode = encodeURIComponent(req.params.artist);
        var album_encode = encodeURIComponent(req.params.album);
        var title_encode = encodeURIComponent(req.params.music);

        var string = Fetch.fetch(artist_encode+"/"+album_encode+"/"+title_encode);

        console.log("http://localhost:3000/regist/"+string);
        request({ 
            url: "http://localhost:3000/regist/"+string, 
            method: 'POST', 
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
    });

    app.put('/song/:artist/:album/:music', function (req, res) {
        //compute data here
        var artist_encode = encodeURIComponent(req.params.artist);
        var album_encode = encodeURIComponent(req.params.album);
        var title_encode = encodeURIComponent(req.params.music);
        
        var string = Fetch.fetch(artist_encode+"/"+album_encode+"/"+title_encode);
        request({ 
            url: "http://localhost:3000/song/"+string, 
            method: 'PUT', 
            form: req.body
        }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                res.send({result:1});
            }
            else
            {
                res.send({result:0});
            }
        });
    });

    app.put('/song/:artist/:album', function (req, res) {
        //compute data here
        var artist_encode = encodeURIComponent(req.params.artist);
        var album_encode = encodeURIComponent(req.params.album);

        var string = Fetch.fetch(artist_encode+"/"+album_encode);
        request({ 
            url: "http://localhost:3000/song/"+string, 
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
    });

    app.put('/song/:artist', function (req, res) {
        //compute data here
        var artist_encode = encodeURIComponent(req.params.artist);

        var string = Fetch.fetch(artist_encode);
        request({ 
            url: "http://localhost:3000/song/"+string, 
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
    });

    function content(req, res, param)
    {
        var loggedEmail;
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
                func(JSON.parse(body).info.username);
            }
            else
            {
                //없는 경우
                console.log('check : false');
                nofunc(body.frv);
            }
        });
    }
}
