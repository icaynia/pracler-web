module.exports = function(app)
{
    app.use('/', function (req, res, next) {
        console.log('Request Url:', req.originalUrl);
        next();
    });

    app.use('/view', require('./view'));
    app.use('/', require('./module'));
}
