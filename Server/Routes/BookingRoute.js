const express = require('express');
const router = express.Router();

const BookingController = require('../Controllers/BookingController');

router.post('/create',BookingController.CreateBooking);
router.get('/find-all',BookingController.GetAllBookings);
router.get('/find-by/:id',BookingController.GetBookingById);
router.put('/update/:id',BookingController.UpdateBooking);
router.delete('/delete/:id',BookingController.DeleteBooking);


module.exports = router;