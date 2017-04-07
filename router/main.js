module.exports = function(app)
{
    /** Main Layout
     *  Do not touch this code!
     */
    app.get('/', function(req, res) {
        res.render('./layouts/layout', {param: "/"});
    });

    app.get('/login', function(req, res) {
        res.render('./layouts/layout', {param: "/login"});
    });

    app.get('/song/:artist/:album/:title', function(req, res) {
        res.render('./layouts/layout', {
            param: "/song/"+req.params.artist+"/"+req.params.album+"/"+req.params.title+"/"
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

    
    // song (/song/a/b/c)
    app.get('/view/song/:artist/:album/:title', function (req, res) {
        //compute data here
        res.render('./pages/home', {
            title: req.params.artist+"/"+req.params.album+"/"+req.params.title+"/"
        });
    });

    // song search (/song/a/b/c)
    app.get('/view/song/search/:search', function (req, res) {
        //compute data here
        res.render('./pages/home', {
            title: "search : " + req.params.search
        });
    });

    // etc
    app.get('/view/:v', function (req, res) {
        //compute data here
        res.render('./pages/home', {title: req.params.v});
    });
}
