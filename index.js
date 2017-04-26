var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
mongoose = require('mongoose');
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
    // CONNECTED TO MONGODB SERVER
    console.log("Connected to mongod server");
});
mongoose.connect('mongodb://admin:adminds031895@ds031895.mlab.com:31895/pracler');

app.set('port', (process.env.PORT || 5000));
var port2 = 443;
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(session({
  key: 'pracler',
  secret: 'sigggnnnnnnn##!!',
  cookie:{maxAge:7 * 24 * 60 * 1000},
  store: require('mongoose-session')(mongoose)
}));
var router = require('./router/main')(app);




// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});

app.use(function (req,res) {
    res.status(404).render('./layouts/layout', {param:'/404'});
    console.log("404");
});