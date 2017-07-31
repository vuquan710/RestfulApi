var config = require('config');
var MongoClient = require('mongodb').MongoClient
    , assert = require('assert');
const database = config.get('database.name');

const url = 'mongodb://localhost:27017/' + database;
var connection;

module.exports = function (callback) {
    if (connection) {
        callback(connection);
    } else {
        MongoClient.connect(url, function(err, db) {
            console.log("Connect database");
            connection = db;
            callback(db);
        })
    }
}