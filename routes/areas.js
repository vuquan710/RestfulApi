var express = require('express');
var router = express.Router();
var AreaController = require('./../controllers/areas.controller');

router.get('/get-all-clu', AreaController.getAllClu);
router.get('/get-all-parcel', AreaController.getAllParcel);

module.exports = router;