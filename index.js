var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
var router = require('./router/main')(app);

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');



app.use(function (req,res) {
    res.render('./layouts/layout', {param:req.url});
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
