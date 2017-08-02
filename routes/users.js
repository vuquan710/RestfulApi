var express = require('express');
var router = express.Router();
var UserController = require('./../controllers/users.controller');

router.get('/get-email/:userId', UserController.getEmail);
router.get('/verify-token/:token', UserController.verifyToken);
router.get('/get-upload-status', UserController.getUploadStatus);

module.exports = router;