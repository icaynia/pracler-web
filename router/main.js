module.exports = function(app)
{
    app.get('/', function(req, res) {
        res.render('./layouts/layout', 
            {
                layout: false
            }
        );
    });

    app.get('/login', function(req, res) {
        res.json({result:'success'})
    });

    app.get('/mypartial', function (req, res) {
        //compute data here
        res.render('./pages/login', {layout: false, data: data});
    });
}
