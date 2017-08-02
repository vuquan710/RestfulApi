var Promise = require('promise');
var GeoJSON = require('geojson');

var connection = require('./connection');

module.exports = {
    getUserById: function (userId) {
        return new Promise(function (resolve, reject) {
            connection(function (db) {
                var User = db.collection('users');
                User.findOne({'_id': userId}, function (err, data) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(data);
                    }
                })
            })
        })
    },

    getEmail: function (userId) {
        return new Promise(function (resolve, reject) {
            connection(function (db) {
                var User = db.collection('users');
                User.findOne({'_id': userId}, function (err, user) {
                    var email;
                    if ('password' in user['services']) {
                        email = user.emails[0]['address']
                    } else {
                        let type = 'facebook' in user['services'] ? 'facebook' : 'google';
                        email = user['services'][type]['email']
                    }

                    resolve(email.indexOf('@terva.ag') != -1 || email == 'nguyentienvu94@gmail.com');
                })
            })
        })
    },

    verifyToken: function (token) {
        return new Promise(function (resolve, reject) {
            connection(function (db) {
                var User = db.collection('users');
                User.findOne({
                    tokenConfirmAdmin: token,
                    confirmAdmin: false
                }, function (err, user) {
                    if (!user || err) {
                        resolve(false);
                    } else {
                        User.update({
                            tokenConfirmAdmin: token,
                            confirmAdmin: false
                        }, {
                            '$set': {
                                confirmAdmin: true
                            }
                        }, function (err, data) {
                            resolve(err ? false : true);
                        })
                    }
                })
            })
        })
    },

    getUploadStatus: function () {
         return new Promise(function (resolve, reject) {
            connection(function (db) {
                var Upload = db.collection('upload');
                Upload.findOne({'type': 'upload'}, function (err, upload) {
                    if (err) {
                        reject(err);
                    } else {
                        if (!upload) {
                            resolve({
                                status: 0,
                                information: []
                            })
                        } else {
                            try {
                                if (upload['status'] == 1) {
                                    resolve({
                                        status: 1
                                    })
                                } else if (upload['status'] == 2) {
                                    resolve({
                                        status: 2
                                    })
                                } else {
                                    resolve({
                                        status: 0,
                                        information: upload['upload']
                                    })
                                }
                            } catch (e) {
                                resolve({
                                    status: 0,
                                    information: []
                                })
                            }
                        }
                    }
                })
            })
        })
    }
}