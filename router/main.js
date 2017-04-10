//require('../utils/strings.js');

var request = require('request');

module.exports = function(app)
{
    /** Main Layout
     *  
     */

    // now
    app.get('/now', function(req, res) {
        res.render('./layouts/layout', {param: "/now"});
    });

    // login
    app.get('/login', function(req, res) {
        res.render('./layouts/layout', {param: "/login"});
    });

    app.get('/song/:artist/:album/:title', function(req, res) {
        var string = fetch("/song/"+req.params.artist+"/"+req.params.album+"/"+req.params.title);
        res.render('./layouts/layout', {
            param: string
        });
    });

    app.get('/edit/:artist/:album/:title', function(req, res) {
        var string = fetch("/edit/"+req.params.artist+"/"+req.params.album+"/"+req.params.title);
        res.render('./layouts/layout', {
            param: string
        });
    });

    app.get('/song/:artist/:album', function(req, res) {
        var string = fetch("/song/"+req.params.artist+"/"+req.params.album)
        res.render('./layouts/layout', {
            param: string
        });
    });

    app.get('/song/search/:search', function(req, res) {
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
        res.render('./pages/song_artist', {
            param: req.params
        });
    });

    // song (/song/a/b) overview - ALBUM
    app.get('/view/song/:artist/:album', function (req, res) {
        //compute data here
        res.render('./pages/song_album', {
            param: req.params
        });
    });

    // song (/song/a/b/c) overview - MUSIC
    app.get('/view/song/:artist/:album/:music', function (req, res) {
        //compute data here
        var artist_encode = encodeURIComponent(req.params.artist);
        var album_encode = encodeURIComponent(req.params.album);
        var title_encode = encodeURIComponent(req.params.music);

        var string = fetch(artist_encode+"/"+album_encode+"/"+title_encode);
        
        request("http://localhost:3000/song/"+string , function (error, response, body) {
            if (!error && response.statusCode == 200) {
                //있는 경우
                console.log(body) // Print the google web page.
                res.render('./pages/song_music', {
                    param: req.params
                });
            }
            else
            {
                //없는 경우
                console.log(error) 
            }
        })
        
    });

    app.get('/view/edit/:artist/:album/:music', function (req, res) {
        //compute data here
        res.render('./pages/song_music', {
            param: req.params
        });
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
        res.render('./pages/home', {
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
        res.render('./pages/404');
    });

    

}

function fetch(str)
{
    return str.replace(/ /gi, '+');
}