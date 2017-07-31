var express = require('express');
var config = require('config');

const host = config.get('server.host');
const port = config.get('server.port');
const database = config.get('database.name');

var areas = require('./routes/areas');
var app = express();
app.use('/area', areas);

app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.render('error');
});

var server = app.listen(process.env.PORT || port, host, function () {
    console.log('Server is running on port', port);
});

module.exports = app;