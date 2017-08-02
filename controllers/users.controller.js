var UserModel = require('./../models/user.model');

module.exports = {
    getEmail: function (req, res) {
        UserModel.getEmail(req.params.userId).then(function (data) {
            res.json(data);
        })
    },

    verifyToken: function (req, res) {
    	UserModel.verifyToken(req.params.token).then(function (data) {
            res.json(data);
        })
    },

    getUploadStatus: function (req, res) {
    	UserModel.getUploadStatus().then(function (data) {
            res.json(data);
        })
    }
}