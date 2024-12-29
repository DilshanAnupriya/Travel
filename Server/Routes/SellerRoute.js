const express = require('express');
const router = express.Router();

const SellerController = require('../Controllers/SellerController');

router.post('/create',SellerController.CreateSeller);
router.get('/find-all',SellerController.FindAllSeller);
router.get('/find-by/:id',SellerController.FindSellerById);
router.put('/update/:id',SellerController.UpdateSeller);
router.delete('/delete/:id',SellerController.DeleteSeller);
router.get('/highest-ratings',SellerController.HighestRatings);


module.exports = router;