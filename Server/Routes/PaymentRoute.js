const express = require('express');
const router = express.Router();

const PaymentController = require('../Controllers/PaymentController');

router.post('/create',PaymentController.MakePayment);
router.get('/today-income',PaymentController.TodayIncome);
router.get('/monthly-income',PaymentController.MonthlyIncome);
router.get('/weekly-income',PaymentController.weekIncome);
router.get('/total-income',PaymentController.TotalIncome);


module.exports = router;