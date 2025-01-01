const express = require('express');
const router = express.Router();

const HotelController = require('../Controllers/HotelController');

router.post('/create',HotelController.CreateHotel);
router.get('/find-all',HotelController.FindAllHotel);
router.get('/find-by/:id',HotelController.FindHotelById);
router.put('/update/:id',HotelController.UpdateHotel);
router.delete('/delete/:id',HotelController.DeleteHotel);


module.exports = router;