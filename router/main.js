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
        res.render('./layouts/layout', {
            param: "/song/"+req.params.artist+"/"+req.params.album+"/"+req.params.title
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


    app.get('/view/', function (req, res) {
        //compute data here
        res.render('./pages/home', {title: "home"});
    });

    // song (/song/a/b/c) overview
    app.get('/view/song/:artist/:album/:music', function (req, res) {
        //compute data here
        res.render('./pages/song_music', {
            param:req.params
        });
    });

    // song search (/song/a/b/c)
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

    app.get('/view/:v', function (req, res) {
        //compute data here
        res.render('./pages/404');
    });

    

}
