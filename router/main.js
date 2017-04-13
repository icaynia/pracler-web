//require('../utils/strings.js');

var request = require('request');

module.exports = function(app)
{
    /** Main Layout
     *  
     */

    // now

    app.get('/', function(req, res) {
        res.render('./layouts/layout', {param: "/"});
    });


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

    app.get('/song/:artist/:album/:title', function(req, res) {
        var string = fetch("/song/"+req.params.artist+"/"+req.params.album+"/"+req.params.title+"?mode="+req.param('mode'));
        res.render('./layouts/layout', {
            param: string
        });
    });

    app.get('/song/:artist/:album', function(req, res) {
        var string = fetch("/song/"+req.params.artist+"/"+req.params.album+"?mode="+req.param('mode'))
        res.render('./layouts/layout', {
            param: string
        });
    });

    app.get('/song/:artist', function(req, res) {
        var string = fetch("/song/"+req.params.artist+"?mode="+req.param('mode'))
        res.render('./layouts/layout', {
            param: string
        });
    });
 
    app.get('/search/:search', function(req, res) {
        res.render('./layouts/layout', {
            param: "/song/search/"+req.params.search
        });
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
                console.log(string);
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
        
        request("http://localhost:3000/song/"+string , function (error, response, body) {
            if (!error && response.statusCode == 200) {
                //있는 경우
                console.log(unfetch(body)) // Print the google web page.
                res.render('./pages/song_album', {
                    param: req.params,
                    data: JSON.parse(unfetch(body))
                });
            }
            else
            {
                //없는 경우
                console.log(string);
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
                //없는 경우
                console.log(string);
                res.render('./pages/404');
            }
        })
        
    });

    app.get('/view/song/search/:search', function (req, res) {
        //compute data here
        res.render('./pages/home', {
            title: "search : " + req.params.search
        });
    });

    app.get('/view/now', function (req, res) {
        //compute data here
        res.render('./pages/home', {
            title: "now"
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
        //compute data here
        res.render('./pages/404');
    });

    app.get('/view/*', function (req, res) {
        //compute data here
        res.render('./pages/home', {
            param: req.params
        });
    });
    


    app.put('/song/:artist/:album/:music', function (req, res) {
        //compute data here
        var artist_encode = encodeURIComponent(req.params.artist);
        var album_encode = encodeURIComponent(req.params.album);
        var title_encode = encodeURIComponent(req.params.music);

        var string = fetch(artist_encode+"/"+album_encode+"/"+title_encode);
        console.log("Attributes : " + req.body.music_image_url);
        request({ 
            url: "http://localhost:3000/song/"+string, 
            method: 'PUT', 
            form: req.body
        }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                //있는 경우
                console.log("ok");
                res.send({result:1});
            }
            else
            {
                //없는 경우
                console.log("no");
                res.send({result:0});
            }
        });
    });

    app.put('/song/:artist/:album', function (req, res) {
        //compute data here
        var artist_encode = encodeURIComponent(req.params.artist);
        var album_encode = encodeURIComponent(req.params.album);

        var string = fetch(artist_encode+"/"+album_encode);
        console.log("Attributes : " + req.body.music_image_url);
        request({ 
            url: "http://localhost:3000/song/"+string, 
            method: 'PUT', 
            form: req.body
        }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                //있는 경우
                console.log("ok");
                res.send({result:1});
            }
            else
            {
                //없는 경우
                console.log("no");
                res.send({result:0});
            }
        });
    });

    app.put('/song/:artist', function (req, res) {
        //compute data here
        var artist_encode = encodeURIComponent(req.params.artist);

        var string = fetch(artist_encode);
        console.log("Attributes : " + req.body.artist_image_url);
        request({ 
            url: "http://localhost:3000/song/"+string, 
            method: 'PUT', 
            form: req.body
        }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                //있는 경우
                console.log("error");
                res.send({result:1});
            }
            else
            {
                //없는 경우
                console.log("no");
                res.send({result:0});
            }
        });
    });

}

function fetch(str)
{
    return str.replace(/ /gi, '+');
}

function unfetch(str)
{
    return str.replace('+', ' ');
}