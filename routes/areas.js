var express = require('express');
var router = express.Router();
var AreaController = require('./../controllers/areas.controller');

router.get('/get-all-clu', AreaController.getAllClu);
router.get('/get-all-parcel', AreaController.getAllParcel);
router.get('/get-all-clu-no-login', AreaController.getAllCluNoLogin);
router.get('/get-all-parcel-no-login', AreaController.getAllParcelNoLogin);
router.get('/get-search-advanced-condition', AreaController.getConditionSearch);
router.post('/search-advanced', AreaController.searchAdvanced);
router.get('/get-all-county', AreaController.getAllCounty);
router.get('/get-closest-map/:lat/:lng/:distance', AreaController.getClosestMap);
router.get('/get-str/:lat/:lng', AreaController.getStr);
router.post('/save-search-history', AreaController.saveSearchHistory);

module.exports = router;