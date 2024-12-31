const express = require('express');
const router = express.Router();

const OrderController = require('../Controllers/OrderController');

router.post('/create',OrderController.CreatedOrder);
router.get('/find-all',OrderController.FindAllOrder);
router.get('/find-by/:id',OrderController.FindOrderById);
router.put('/update/:id',OrderController.UpdateOrder);
router.put('/update-status/:id',OrderController.UpdateStatusOrder);
router.delete('/delete/:id',OrderController.DeleteOrder);


module.exports = router;