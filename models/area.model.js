var Promise = require('promise');
var GeoJSON = require('geojson');
var NodeCache = require('node-cache');
var request = require('request');

var Search = require('./search.model');
var UserModel = require('./user.model');
var UtilHelper = require('./../helpers/util.helper');
var connection = require('./connection');
var listField = require('./../constants/data.constant');
CACHE = new NodeCache({checkperiod: 3600});

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
    },

    getAllCluNoLogin: function () {
        return new Promise(function (resolve, reject) {
            connection(function (db) {
                var fields = listField.nonLoginField();
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

    getAllParcelNoLogin: function () {
        return new Promise(function (resolve, reject) {
            connection(function (db) {
                var fields = listField.nonLoginField();
                db.collection('parcel').find({}, {fields: fields}).toArray(function (err, listParcel) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(GeoJSON.parse(listParcel, {'GeoJSON': 'geometry'}));
                    }
                });
            })
        })
    },

    getAllCounty: function () {
        return new Promise(function (resolve, reject) {
            connection(function (db) {
                db.collection('counties').find({}).toArray(function (err, listCounty) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(listCounty);
                    }
                });
            })
        })
    },

    getClosestMap: function (lat, lng, distance) {
        var result, n = 1;
        lat = parseFloat(lat);
        lng = parseFloat(lng);
        return new Promise(function (resolve, reject) {
            connection(function (db) {
                var Clu = db.collection('clu_bed');
                var getData = function (d) {
                    Clu.findOne({
                        "loc": {
                            "$near": {
                                "$geometry": {"type": "Point", "coordinates": [lat, lng]},
                                "$maxDistance": d
                            }
                        },
                        "sales.Status": {"$exists": 1}
                    }, function (err, clu) {
                        if (clu) {
                            resolve(clu);
                        } else {
                            n++;
                            getData(distance * n);
                        }
                    })
                }

                getData(distance);
            })
        })
    },

    getSTR: function (lng, lat) {
        lat = parseFloat(lat);
        lng = parseFloat(lng);
        return new Promise(function (resolve, reject) {
            connection(function (db) {
                var AltFirst = db.collection('alt_first');
                AltFirst.find({
                    "geometry": {
                        "$geoIntersects": {
                            "$geometry": {
                                "type": "Point",
                                "coordinates": [lng, lat]
                            }
                        }
                    }
                }).toArray(function (err, result) {
                    if (err) {
                        reject(err);
                    } else {
                        var prop = result[0].properties;
                        var sect = prop.label;
                        var lndKey = prop.lndkey;
                        var twnshpStr = lndKey.slice(5, 10);
                        var rangeStr = lndKey.slice(10, 15);
                        var twnshp = parseInt(twnshpStr.substring(0, 3)) + twnshpStr.charAt(4);
                        var range = parseInt(rangeStr.substring(0, 3)) + rangeStr.charAt(4);
                        resolve(sect + "-" + twnshp + "-" + range);
                    }
                })
            })
        })
    },

    getSearchAdvancedCondition: function () {
        return new Promise(function (resolve, reject) {
            CACHE.get('SEARCH_CONDITION', function (err, value) {
                if (err || !value) {
                    console.log("Cache query search miss. Must query in database");
                    Search.getMaxSale().then(function (maxSale) {
                        Search.getMinSale().then(function (minSale) {
                            Search.getMaxTotalArces().then(function (maxTotalArces) {
                                Search.getMinTotalArces().then(function (minTotalArces) {
                                    Search.getMaxSaleDate().then(function (maxSaleDate) {
                                        Search.getMinSaleDate().then(function (minSaleDate) {
                                            Search.getMaxPriceAcre().then(function (maxPriceAcre) {
                                                Search.getMinPriceAcre().then(function (minPriceAcre) {
                                                    Search.getMaxSalePrice().then(function (maxSalePrice) {
                                                        Search.getMinSalePrice().then(function (minSalePrice) {
                                                            Search.getMaxTillableAcres().then(function (maxTillableAcres) {
                                                                Search.getMinTillableAcres().then(function (minTillableAcres) {
                                                                    var result = {
                                                                        maxSale: maxSale,
                                                                        minSale: minSale,
                                                                        maxTotalArces: maxTotalArces,
                                                                        minTotalArces: minTotalArces,
                                                                        maxSaleDate: new Date(maxSaleDate.toString()).toString(),
                                                                        minSaleDate: new Date(minSaleDate.toString()).toString(),
                                                                        maxPriceAcre: maxPriceAcre,
                                                                        minPriceAcre: minPriceAcre,
                                                                        maxSalePrice: maxSalePrice,
                                                                        minSalePrice: minSalePrice,
                                                                        maxTillableAcres: maxTillableAcres,
                                                                        minTillableAcres: minTillableAcres
                                                                    };

                                                                    CACHE.set('SEARCH_CONDITION', result);
                                                                    resolve(result);
                                                                })
                                                            })
                                                        })
                                                    })
                                                })
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                } else {
                    console.log("Have data search condition in cache");
                    resolve(value);
                }
            })
        })
    },

    searchAdvanced: function (query) {
        var condition = UtilHelper.convertQuerySearch(query);

        return new Promise(function (resolve, reject) {
            connection(function (db) {
                var Parcel = db.collection('parcel');
                var Clu = db.collection('clu_bed');
                Parcel.find(condition, UtilHelper.enterPriseField).toArray(function (err, listParcel) {
                    Clu.find(condition, UtilHelper.enterPriseField).toArray(function (err, listClu) {
                        var result = {
                            result: listParcel.concat(listClu),
                            condition: condition
                        }

                        resolve(result)
                    })
                })
            })
        })
    },

    saveSearchHistory: function (data) {
        var time = UtilHelper.getTimeCST();
        return new Promise(function (resolve, reject) {
            UserModel.getUserById(data['_id']).then(function (user) {
                connection(function (db) {
                    var HistorySearch = db.collection('history_search');
                    HistorySearch.insert({
                        lastName: UtilHelper.getLastNameUser(user),
                        firstName: UtilHelper.getFirstNameUser(user),
                        email: UtilHelper.getEmail(user),
                        fullTime: time.fullTime,
                        date: time.onlyDate,
                        phone: user['profile']['phone'] ? user['profile']['phone'] : '',
                        account_type: user['account_type']
                    }, function (err, result) {
                        if (err) {
                            console.log(err);
                            reject(err);
                        } else {
                            resolve(true);
                        }
                    })
                })
            })
        })
    },

    getCluByStatus: function (status) {
        return new Promise(function (resolve, reject) {
            connection(function (db) {
                var fields = listField.enterPriseField();
                db.collection('clu_bed').find({'sales.Status': status}, {fields: fields}).toArray(function (err, listClu) {
                    if (err) {
                        reject(err);
                    } else {
                        // resolve(GeoJSON.parse(listClu, {'GeoJSON': 'geometry'}));
                        // resolve(listClu);
                        resolve(UtilHelper.groupListSale(listClu));
                    }
                });
            })
        })
    },

    getParcelByStatus: function (status) {
        return new Promise(function (resolve, reject) {
            connection(function (db) {
                var fields = listField.enterPriseField();
                db.collection('parcel').find({'sales.Status': status}, {fields: fields}).toArray(function (err, listParcel) {
                    if (err) {
                        reject(err);
                    } else {
                        // resolve(GeoJSON.parse(listParcel, {'GeoJSON': 'geometry'}));
                        // resolve(listParcel);
                        resolve(UtilHelper.groupListSale(listParcel));
                    }
                });
            })
        })
    },

    getCluNoLoginByStatus: function (status) {
        return new Promise(function (resolve, reject) {
            connection(function (db) {
                var fields = listField.nonLoginField();
                db.collection('clu_bed').find({'sales.Status': status}, {fields: fields}).toArray(function (err, listClu) {
                    if (err) {
                        reject(err);
                    } else {
                        // resolve(GeoJSON.parse(listClu, {'GeoJSON': 'geometry'}));
                        // resolve(listClu);
                        resolve(UtilHelper.groupListSale(listClu));
                    }
                });
            })
        })
    },

    getParcelNoLoginByStatus: function (status) {
        return new Promise(function (resolve, reject) {
            connection(function (db) {
                var fields = listField.nonLoginField();
                db.collection('parcel').find({'sales.Status': status}, {fields: fields}).toArray(function (err, listParcel) {
                    if (err) {
                        reject(err);
                    } else {
                        // resolve(GeoJSON.parse(listParcel, {'GeoJSON': 'geometry'}));
                        // resolve(listParcel);
                        resolve(UtilHelper.groupListSale(listParcel));
                    }
                });
            })
        })
    },

    getClosestMapFull: function (lat, lng, radius, collection) {
        return new Promise(function (resolve, reject) {
            var url = "http://localhost:8092/api/v1/closest_api/" + lng + "/" + lat + "/" + collection + "/" + radius
            request(url, function (error, response, body) {
                resolve(body);
            });
        })
    }

}