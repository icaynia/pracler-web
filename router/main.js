//require('../utils/strings.js');

var request = require('request');
var ursa = require('ursa');
var fs = require('fs');


module.exports = function(app)
{
    /** Main Layout
     *  
     */
    var crt = ursa.createPublicKey(fs.readFileSync('utils/server.pub'));

    app.post('/rsa/encrypt', function(req, res) {
        res.json({
            pw: crt.encrypt(req.body.inputPassword, 'utf8', 'base64')
        });
    });

    app.get('/data/session', function(req, res) {
        console.log(req.session.email);
        res.json({
            session: req.session.email
        });
    });
    
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
        res.render('./layouts/layout', {
            param: "/",
            session: req.session.email 

        });
    });


    app.get('/now', function(req, res) {
        res.render('./layouts/layout', {param: "/now",
            session: req.session.email});
    });

    app.get('/cast', function(req, res) {
        res.render('./layouts/layout', {param: "/cast",
            session: req.session.email});
    });
    // login
    app.get('/login', function(req, res) {
        res.render('./layouts/layout', {param: "/login",
            session: req.session.email});
    });
    
    app.get('/add', function(req, res) {
        var string = fetch("/add");
        res.render('./layouts/layout', {
            param: string,
            session: req.session.email
        });
    });

    app.get('/signup', function(req, res) {
        var string = fetch("/signup");
        res.render('./layouts/layout', {
            param: string,
            session: req.session.email
        });
    });
    
    app.get('/add/artist', function(req, res) {
        var string = fetch("/add/artist");
        res.render('./layouts/layout', {
            param: string,
            session: req.session.email
        });
    });
    
    app.get('/add/album', function(req, res) {
        var string = fetch("/add/album");
        res.render('./layouts/layout', {
            param: string,
            session: req.session.email
        });
    });
    
    app.get('/add/music', function(req, res) {
        var string = fetch("/add/music");
        res.render('./layouts/layout', {
            param: string,
            session: req.session.email
        });
    });

    app.get('/song/:artist/:album/:title', function(req, res) {
        var string = fetch("/song/"+req.params.artist+"/"+req.params.album+"/"+req.params.title+"?mode="+req.param('mode'));
        res.render('./layouts/layout', {
            param: string,
            session: req.session.email
        });
    });

    app.get('/song/:artist/:album', function(req, res) {
        var string = fetch("/song/"+req.params.artist+"/"+req.params.album+"?mode="+req.param('mode'))
        res.render('./layouts/layout', {
            param: string,
            session: req.session.email
        });
    });

    app.get('/song/:artist', function(req, res) {
        var string = fetch("/song/"+req.params.artist+"?mode="+req.param('mode'))
        res.render('./layouts/layout', {
            param: string,
            session: req.session.email
        });
    });
 
    app.get('/search/:search', function(req, res) {
        var string = fetch("/search/"+req.params.search)
        res.render('./layouts/layout', {
            param: string,
            session: req.session.email
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
        console.log(req.params.search);
        var string = encodeURIComponent(fetch(req.params.search));
        
        req.params.search = unfetch(req.params.search);

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

    app.get('/viewcall/search/artist/:search', function (req, res) {
        console.log(req.params.search);
        var string = encodeURIComponent(fetch(req.params.search));
        
        req.params.search = unfetch(req.params.search);

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

        var string = fetch(req.params.search);
        
        req.params.search = unfetch(req.params.search);
        res.render('./pages/search/simple_album.ejs');
    });

    app.get('/viewcall/search/user/:search', function (req, res) {

        var string = fetch(req.params.search);
        
        req.params.search = unfetch(req.params.search);
        res.render('./pages/search/simple_user.ejs');
    });
    /** View
     *  
     */


    // home (/)
    // song (/song/a) overview - ARTIST
    app.get('/view/song/:artist', function (req, res) {
        //compute data here
        var artist_encode = encodeURIComponent(req.params.artist);

        var view_layout;
        switch (req.param('mode'))
        {
            case "edit":
                view_layout = './pages/song_artist_edit';
                break;
            default:
                view_layout = './pages/song_artist';
                break;
        }

        var string = fetch(artist_encode);
        
        request("http://localhost:3000/song/"+string , function (error, response, body) {
            if (!error && response.statusCode == 200) {
                //있는 경우
                res.render(view_layout, {
                    param: req.params,
                    data: JSON.parse(unfetch(body))
                });
            }
            else
            {
                //없는 경우
                res.render('./pages/404');
            }
        })
        
    });

    // song (/song/a/b) overview - ALBUM
    app.get('/view/song/:artist/:album', function (req, res) {
        //compute data here
        var artist_encode = encodeURIComponent(req.params.artist);
        var album_encode = encodeURIComponent(req.params.album);

        var string = fetch(artist_encode+"/"+album_encode);
        var view_layout;
        switch (req.param('mode'))
        {
            case "edit":
                view_layout = './pages/song_album_edit';
                break;
            default:
                view_layout = './pages/song_album';
        }

        request("http://localhost:3000/song/"+string , function (error, response, body) {
            if (!error && response.statusCode == 200) {
                //있는 경우
                res.render(view_layout, {
                    param: req.params,
                    data: JSON.parse(unfetch(body))
                });
            }
            else
            {
                res.render('./pages/404');
            }
        })
    });

    // song (/song/a/b/c) overview - MUSIC
    app.get('/view/song/:artist/:album/:music', function (req, res) {
        //compute data here
        var artist_encode = encodeURIComponent(req.params.artist);
        var album_encode = encodeURIComponent(req.params.album);
        var title_encode = encodeURIComponent(req.params.music);

        var view_layout;
        switch (req.param('mode'))
        {
            case "edit":
                view_layout = './pages/song_music_edit';
                break;
            default:
                view_layout = './pages/song_music';
        }

        var string = fetch(artist_encode+"/"+album_encode+"/"+title_encode);
        
        request("http://localhost:3000/song/"+string , function (error, response, body) {
            if (!error && response.statusCode == 200) {
                //있는 경우
                res.render(view_layout, {
                    param: req.params,
                    data: JSON.parse(unfetch(body))
                });
            }
            else
            {
                res.render('./pages/404');
            }
        })
        
    });

    app.get('/view/search/:search', function (req, res) {

        var string = encodeURIComponent(fetch(req.params.search));
        
        req.params.search = unfetch(req.params.search);
        request("http://localhost:3000/search/"+string , function (error, response, body) {
            if (!error && response.statusCode == 200) {
                //있는 경우
                res.render('./pages/search', {
                    param: req.params,
                    data: JSON.parse(unfetch(body)),
                    search: req.params.search
                });
            }
            else
            {
                res.render('./pages/404');
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

    app.get('/view', function (req, res) {
        //compute data here
        res.render('./pages/home');
    });

    app.post('/signup/user', function (req, res) {
        //compute data here

        request({ 
            url: "http://localhost:3000/signup", 
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

    app.post('/signin/user', function (req, res) {

        request({ 
            url: "http://localhost:3000/signin", 
            method: 'POST', 
            form: req.body
        }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                //성공
                res.send({result:1});
                console.log("성공 : " + req.body.inputEmail);
                req.session.email = req.body.inputEmail;
                req.session.save(function() {
                    console.log("저장 성공");
                });
                console.log("sess : " + req.session.email);
            }
            else
            {
                //실패
                res.send({result:0});
                console.log("\x1b[31m", "실패 : " + req.body.inputEmail);
            }
        });
    });

    app.put('/regist/:artist/:album/:music', function (req, res) {
        //compute data here

        var artist_encode = encodeURIComponent(req.params.artist);
        var album_encode = encodeURIComponent(req.params.album);
        var title_encode = encodeURIComponent(req.params.music);

        var string = fetch(artist_encode+"/"+album_encode+"/"+title_encode);

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
        
        var string = fetch(artist_encode+"/"+album_encode+"/"+title_encode);
        console.log("http://localhost:3000/song/"+string);
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

        var string = fetch(artist_encode+"/"+album_encode);
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

        var string = fetch(artist_encode);
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
}

function fetch(str)
{
    return str.replace(/ /gi, '+');
}

String.prototype.replaceAll = function(org, dest) {
    return this.split(org).join(dest);
}

function unfetch(str)
{
    return str.replaceAll('+', ' ');
}

