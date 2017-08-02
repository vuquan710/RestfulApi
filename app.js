var express = require('express');
var bodyParser = require('body-parser');
var engines = require('consolidate');
var path = require('path');
var ejs = require('ejs');
var config = require('config');

const host = config.get('server.host');
const port = config.get('server.port');
const database = config.get('database.name');

var areas = require('./routes/areas');
var users = require('./routes/users');
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.engine('html', engines.mustache);
app.set('view engine', 'html');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/area', areas);
app.use('/user', users);

app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    console.log(err);
    res.render('error');
});

var server = app.listen(process.env.PORT || port, host, function () {
    console.log('Server is running on port', port);
});

module.exports = app;