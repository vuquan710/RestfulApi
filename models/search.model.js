var Promise = require('promise');
var GeoJSON = require('geojson');

var connection = require('./connection');

module.exports = {
    getMinSale: function () {
        return new Promise(function (resolve, reject) {
            connection(function (db) {
                var Parcel = db.collection('parcel');
                var Clu = db.collection('clu_bed');
                Parcel.findOne({}, {sort: {'sales.Sale_Price': -1}, limit: 1}, function (err, data) {
                    var maxSaleParcel = data['sales']['Sale_Price'];
                    Clu.findOne({}, {sort: {'sales.Sale_Price': -1}, limit: 1}, function (err, data) {
                        var maxSaleClu = data['sales']['Sale_Price'];
                        resolve(maxSaleClu > maxSaleParcel ? maxSaleClu : maxSaleParcel);
                    });
                });
            })
        })
    },

    getMaxSale: function () {
        return new Promise(function (resolve, reject) {
            connection(function (db) {
                var Parcel = db.collection('parcel');
                var Clu = db.collection('clu_bed');
                Parcel.findOne({'sales.Sale_Price': {"$exists": 1, "$ne": null}}, {sort: {'sales.Sale_Price': 1}, limit: 1}, function (err, data) {
                    var minSaleParcel = data['sales']['Sale_Price'];
                    Clu.findOne({'sales.Sale_Price': {"$exists": 1, "$ne": null}}, {sort: {'sales.Sale_Price': 1}, limit: 1}, function (err, data) {
                        var minSaleClu = data['sales']['Sale_Price'];
                        resolve(minSaleClu < minSaleParcel ? minSaleClu : minSaleParcel);
                    });
                });
            })
        })
    },

    getMaxTotalArces: function () {
        return new Promise(function (resolve, reject) {
            connection(function (db) {
                var Parcel = db.collection('parcel');
                var Clu = db.collection('clu_bed');
                Parcel.findOne({}, {sort: {'sales.Total_Acres': -1}, limit: 1}, function (err, data) {
                    var maxTotalArcesParcel = data['sales']['Total_Acres'];
                    Clu.findOne({}, {sort: {'sales.Total_Acres': -1}, limit: 1}, function (err, data) {
                        var maxTotalArcesClu = data['sales']['Total_Acres'];
                        resolve(maxTotalArcesClu > maxTotalArcesParcel ? maxTotalArcesClu : maxTotalArcesParcel);
                    })
                });
            })
        })
    },

    getMinTotalArces: function () {
        return new Promise(function (resolve, reject) {
            connection(function (db) {
                var Parcel = db.collection('parcel');
                var Clu = db.collection('clu_bed');
                Parcel.findOne({'sales.Total_Acres': {"$exists": 1, "$ne": null}}, {sort: {'sales.Total_Acres': 1}, limit: 1}, function (err, data) {
                    var minTotalArcesParcel = data['sales']['Total_Acres'];
                    Clu.findOne({'sales.Total_Acres': {"$exists": 1, "$ne": null}}, {sort: {'sales.Total_Acres': 1}, limit: 1}, function (err, data) {
                        var minTotalArcesClu = data['sales']['Total_Acres'];
                        resolve(minTotalArcesClu < minTotalArcesParcel ? minTotalArcesClu : minTotalArcesParcel)
                    });
                });
            })
        })
    },

    getMaxSaleDate: function () {
        return new Promise(function (resolve, reject) {
            connection(function (db) {
                var Parcel = db.collection('parcel');
                var Clu = db.collection('clu_bed');
                Parcel.findOne({}, {sort: {'sales.Sale_Date': -1}, limit: 1}, function (err, data) {
                    var maxSaleDateParcel = data['sales']['Sale_Date'];
                    Clu.findOne({}, {sort: {'sales.Sale_Date': -1}, limit: 1}, function (err, data) {
                        var maxSaleDateClu = data['sales']['Sale_Date'];
                        resolve(maxSaleDateClu > maxSaleDateParcel ? maxSaleDateClu : maxSaleDateParcel);
                    })
                })
            })
        })
    },

    getMinSaleDate: function () {
        return new Promise(function (resolve, reject) {
            connection(function (db) {
                var Parcel = db.collection('parcel');
                var Clu = db.collection('clu_bed');
                Parcel.findOne({'sales.Sale_Date': {"$exists": 1, "$ne": null}}, {sort: {'sales.Sale_Date': 1}, limit: 1}, function (err, data) {
                    var minSaleDateParcel = data['sales']['Sale_Date'];
                    Clu.findOne({'sales.Sale_Date': {"$exists": 1, "$ne": null}}, {sort: {'sales.Sale_Date': 1}, limit: 1}, function (err, data) {
                        var minSaleDateClu = data['sales']['Sale_Date'];
                        resolve(minSaleDateClu < minSaleDateParcel ? minSaleDateClu : minSaleDateParcel);
                    })
                });
            })
        })
    },

    getMaxPriceAcre: function () {
        return new Promise(function (resolve, reject) {
            connection(function (db) {
                var Parcel = db.collection('parcel');
                var Clu = db.collection('clu_bed');
                Parcel.findOne({}, {sort: {'sales.Price_Acre': -1}, limit: 1}, function (err, data) {
                    var maxPriceAcreParcel = data['sales']['Price_Acre'];
                    Clu.findOne({}, {sort: {'sales.Price_Acre': -1}, limit: 1}, function (err, data) {
                        var maxPriceAcreClu = data['sales']['Price_Acre'];
                        resolve(maxPriceAcreClu > maxPriceAcreParcel ? maxPriceAcreClu : maxPriceAcreParcel)
                    })
                })
            })
        })
    },

    getMinPriceAcre: function () {
        return new Promise(function (resolve, reject) {
            connection(function (db) {
                var Parcel = db.collection('parcel');
                var Clu = db.collection('clu_bed');
                Parcel.findOne({'sales.Price_Acre': {"$exists": 1, "$ne": null}}, {sort: {'sales.Price_Acre': 1}, limit: 1}, function (err, data) {
                    var minPriceAcreParcel = data['sales']['Price_Acre'];
                    Clu.findOne({'sales.Price_Acre': {"$exists": 1, "$ne": null}}, {sort: {'sales.Price_Acre': 1}, limit: 1}, function (err, data) {
                        var minPriceAcreClu = data['sales']['Price_Acre'];
                        resolve(minPriceAcreClu < minPriceAcreParcel ? minPriceAcreClu : minPriceAcreParcel);
                    })
                });
            })
        })
    },

    getMaxSalePrice: function () {
        return new Promise(function (resolve, reject) {
            connection(function (db) {
                var Parcel = db.collection('parcel');
                var Clu = db.collection('clu_bed');
                Parcel.findOne({}, {sort: {'sales.Sale_Price': -1}, limit: 1}, function (err, data) {
                    var maxSalePriceParcel = data['sales']['Sale_Price'];
                    Clu.findOne({}, {sort: {'sales.Sale_Price': -1}, limit: 1}, function (err, data) {
                        var maxSalePriceClu = data['sales']['Sale_Price'];
                        resolve(maxSalePriceClu > maxSalePriceParcel ? maxSalePriceClu : maxSalePriceParcel);
                    })
                })
            })
        })
    },

    getMinSalePrice: function () {
        return new Promise(function (resolve, reject) {
            connection(function (db) {
                var Parcel = db.collection('parcel');
                var Clu = db.collection('clu_bed');
                Parcel.findOne({'sales.Sale_Price': {"$exists": 1, "$ne": null}}, {sort: {'sales.Sale_Price': 1}, limit: 1}, function (err, data) {
                    var minSalePriceParcel = data['sales']['Sale_Price'];
                    Clu.findOne({'sales.Sale_Price': {"$exists": 1, "$ne": null}}, {sort: {'sales.Sale_Price': 1}, limit: 1}, function (err, data) {
                        var minSalePriceClu = data['sales']['Sale_Price'];
                        resolve(minSalePriceClu < minSalePriceParcel ? minSalePriceClu : minSalePriceParcel);
                    })
                })
            })
        })
    },

    getMaxTillableAcres: function () {
        return new Promise(function (resolve, reject) {
            connection(function (db) {
                var Parcel = db.collection('parcel');
                var Clu = db.collection('clu_bed');
                Parcel.findOne({}, {sort: {'sales.Tillable_Acres': -1}, limit: 1}, function (err, data) {
                    var maxTillableAcresParcel = data['sales']['Tillable_Acres'];
                    Clu.findOne({}, {sort: {'sales.Tillable_Acres': -1}, limit: 1}, function (err, data) {
                        var maxTillableAcresClu = data['sales']['Tillable_Acres'];
                        resolve(maxTillableAcresClu > maxTillableAcresParcel ? maxTillableAcresClu : maxTillableAcresParcel);
                    })
                })
            })
        })
    },

    getMinTillableAcres: function () {
        return new Promise(function (resolve, reject) {
            connection(function (db) {
                var Parcel = db.collection('parcel');
                var Clu = db.collection('clu_bed');
                Parcel.findOne({'sales.Tillable_Acres': {"$exists": 1, "$ne": null}}, {sort: {'sales.Tillable_Acres': 1}, limit: 1}, function (err, data) {
                    var minTillableAcresParcel = data['sales']['Tillable_Acres'];
                    Clu.findOne({'sales.Tillable_Acres': {"$exists": 1, "$ne": null}}, {sort: {'sales.Tillable_Acres': 1}, limit: 1}, function (err, data) {
                        var minTillableAcresClu = data['sales']['Tillable_Acres'];
                        resolve(minTillableAcresClu < minTillableAcresParcel ? minTillableAcresClu : minTillableAcresParcel);
                    })
                })
            })
        })
    },

    insertSearchAdvanced: function (userId, condition) {
        connection(function (db) {
            db.collection('search_advanced').insert({
                user_id: userId,
                condition: JSON.stringify(condition),
                time: new Date().getTime()
            })
        })
    }

}