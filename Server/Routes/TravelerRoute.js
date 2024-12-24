const express = require('express');
const router = express.Router();

const TravelController = require('../Controllers/TravelerController');

router.post('/create',TravelController.SaveTraveler);
router.get('/find-all',TravelController.findAllTravelers);
router.get('/find-by/:id',TravelController.getTravelerById);
router.put('/update/:id',TravelController.updateTraveler);
router.delete('/delete/:id',TravelController.deleteTraveler);

module.exports = router;