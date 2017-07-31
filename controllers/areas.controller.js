var Area = require('./../models/area.model');

module.exports = {
    getAllClu : function (req, res) {
        Area.getAllClu().then(function (data) {
            res.json(data);
        })
    },

    getAllParcel : function (req, res) {
        Area.getAllParcel().then(function (data) {
            res.json(data);
        })
    }
}