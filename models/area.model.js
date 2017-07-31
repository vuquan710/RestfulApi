var Promise = require('promise');
var GeoJSON = require('geojson');

var connection = require('./connection');
var listField = require('./../constants/data.constant');

module.exports = {
    getAllClu: function () {
        return new Promise(function (resolve, reject) {
            connection(function (db) {
                var fields = listField.enterPriseField();
                db.collection('clu_bed').find({}, {fields: fields}).toArray(function (err, listClu) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(GeoJSON.parse(listClu, {'GeoJSON': 'geometry'}));
                    }
                });
            })
        })
    },

    getAllParcel: function () {
        return new Promise(function (resolve, reject) {
            connection(function (db) {
                var fields = listField.enterPriseField();
                db.collection('parcel').find({}, {fields: fields}).toArray(function (err, listParcel) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(GeoJSON.parse(listParcel, {'GeoJSON': 'geometry'}));
                    }
                });
            })
        })
    }
}