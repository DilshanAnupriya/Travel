const express = require('express');
const router = express.Router();

const HotelController = require('../Controllers/HotelController');
const verifyToken = require("../mddleware/Auth");

router.post('/create',verifyToken(['admin','manager']),HotelController.CreateHotel);
router.get('/find-all',verifyToken(['admin','manager','user']),HotelController.FindAllHotel);
router.get('/find-by/:id',verifyToken(['admin','manager','user']),HotelController.FindHotelById);
router.put('/update/:id',verifyToken(['admin']),HotelController.UpdateHotel);
router.delete('/delete/:id',verifyToken(['admin']),HotelController.DeleteHotel);
router.get('/best-hotels',verifyToken(['admin','manager','user']),HotelController.HeighestRatings);


module.exports = router;