var express = require('express');
var router = express.Router();
var AreaController = require('./../controllers/areas.controller');

router.get('/get-search-advanced-condition', AreaController.getConditionSearch);
router.post('/search-advanced', AreaController.searchAdvanced);
router.get('/get-all-county', AreaController.getAllCounty);
router.get('/get-closest-map/:lat/:lng/:distance', AreaController.getClosestMap);
router.get('/get-str/:lat/:lng', AreaController.getStr);
router.post('/save-search-history', AreaController.saveSearchHistory);

router.get('/get-all-clu-by-status/:status', AreaController.getAllCluByStatus);
router.get('/get-all-parcel-by-status/:status', AreaController.getAllParcelByStatus);

router.get('/get-all-clu-no-login-by-status/:status', AreaController.getAllCluNoLoginByStatus);
router.get('/get-all-parcel-no-login-by-status/:status', AreaController.getAllParcelNoLoginByStatus);
router.get('/get-closes-map-full/:lat/:lng/:radius/:type', AreaController.getClosestMapFull);
router.get('/get-closest-api/:lng/:lat/:collection/:radius', AreaController.getClosestApiMap);
router.get('/get-area-by-id/:id', AreaController.getAreaById);

module.exports = router;