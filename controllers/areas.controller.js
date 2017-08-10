var request = require('request');

var Area = require('./../models/area.model');
var Search = require('./../models/search.model');

module.exports = {
    getAllCluByStatus: function (req, res) {
        Area.getCluByStatus(req.params.status).then(function (data) {
            res.json(data);
        })
    },

    getAllParcelByStatus: function (req, res) {
        Area.getParcelByStatus(req.params.status).then(function (data) {
            res.json(data);
        })
    },

    getAllCluNoLoginByStatus: function (req, res) {
        Area.getCluNoLoginByStatus(req.params.status).then(function (data) {
            res.json(data);
        })
    },

    getAllParcelNoLoginByStatus: function (req, res) {
        Area.getParcelNoLoginByStatus(req.params.status).then(function (data) {
            res.json(data);
        })
    },

    getAllParcel: function (req, res) {
        Area.getAllParcel().then(function (data) {
            res.json(data);
        })
    },

    getAllCluNoLogin: function (req, res) {
        Area.getAllCluNoLogin().then(function (data) {
            res.json(data);
        })
    },

    getAllParcelNoLogin: function (req, res) {
        Area.getAllParcelNoLogin().then(function (data) {
            res.json(data);
        })
    },

    getConditionSearch: function (req, res) {
        Area.getSearchAdvancedCondition().then(function (data) {
            res.json(data);
        })
    },

    searchAdvanced: function (req, res) {
        var query = req.body.query;
        var userId = req.body.userId;
        Area.searchAdvanced(query).then(function (data) {
            res.json(data);
        })
    },

    getAllCounty: function (req, res) {
        Area.getAllCounty().then(function (data) {
            res.json(data);
        })
    },

    getClosestMap: function (req, res) {
        Area.getClosestMap(req.params.lat, req.params.lng, req.params.distance).then(function (data) {
            res.json(data);
        })
    },

    getStr: function (req, res) {
        Area.getSTR(req.params.lng, req.params.lat).then(function (data) {
            res.json(data);
        })
    },

    saveSearchHistory: function (req, res) {
        Area.saveSearchHistory(req.body.user).then(function (data) {
            res.json(data);
        })
    },

    getClosestMapFull: function (req, res) {
        Area.getClosestMapFull(req.params.lat, req.params.lng, req.params.radius, req.params.type).then(function (data) {
            res.json(data);
        })
    },

    getClosestApiMap: function (req, res) {
        var lng = req.params.lng;
        var lat = req.params.lat;
        var collection = req.params.collection;
        var radius = req.params.radius;
        var url = "http://localhost:8091/api/v1/closest_api/" + lng + "/" + lat + "/" + collection + "/" + radius;
        request(url, function (error, response, body) {
            res.json(body);
        });
    }
}