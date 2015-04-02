var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');

//require('pkginfo')(module, 'version', 'name');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(bodyParser.json());

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

/* GET home page. */
app.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

app.get('/about', function(req, res) {
  res.json({author: "olivier huin"});
});

app.post('/oli', function (req, res) {
    console.log(req.body);
    res.send("ha");
}); 
module.exports = app;