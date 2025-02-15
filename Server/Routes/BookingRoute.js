const express = require('express');
const router = express.Router();
const BookingController = require('../Controllers/BookingController');
const verifyToken = require('../mddleware/Auth');

router.post('/create',verifyToken(['admin','manager','user']),BookingController.CreateBooking);
router.get('/find-all',verifyToken(['admin','manager']),BookingController.GetAllBookings);
router.get('/find-by/:id',verifyToken(['admin','manager','user']),BookingController.GetBookingById);
router.put('/update/:id',verifyToken(['admin','manager']),BookingController.UpdateBooking);
router.delete('/delete/:id',verifyToken(['admin']),BookingController.DeleteBooking);


module.exports = router;