const mongoose = require('mongoose');

var admin = mongoose.model('admin', {name : 'string'});

module.exports = admin;