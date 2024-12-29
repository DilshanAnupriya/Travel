const express = require('express');
const router = express.Router();

const ProductController = require('../Controllers/ProductController');

router.post('/create',ProductController.CreateProduct);
router.get('/find-all',ProductController.FindAllProduct);
router.get('/find-by/:id',ProductController.FindProductById);
router.put('/update/:id',ProductController.UpdateProduct);
router.delete('/delete/:id',ProductController.DeleteProduct);
router.get('/low-qty-list',ProductController.LowQtyProduct);

module.exports = router;