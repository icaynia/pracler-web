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

    /** View
     *  
     */
    app.get('/view/', function (req, res) {
        //compute data here
        res.render('./pages/home', {title: "home"});
    });

    app.get('/view/:v', function (req, res) {
        //compute data here
        res.render('./pages/home', {title: req.params.v});
    });

    app.get('/view/song/:v/:r/:f', function (req, res) {
        //compute data here
        res.render('./pages/home', {title: req.params.v});
    });
     
}
