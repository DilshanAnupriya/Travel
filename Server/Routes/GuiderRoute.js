const express = require('express');
const router = express.Router();
const GuideController = require('../Controllers/GuiderController');
const verifyToken = require('../mddleware/Auth');

router.post('/create',verifyToken(['admin']),GuideController.CreateGuider);
router.get('/find-all',verifyToken(['admin','manager','user']),GuideController.FindAllGuider);
router.get('/find-by/:id',verifyToken(['admin','manager','user']),GuideController.FindGuiderById);
router.put('/update/:id',verifyToken(['admin']),GuideController.UpdateGuider);
router.delete('/delete/:id',verifyToken(['admin']),GuideController.DeleteGuider);
router.get('/top-guiders',verifyToken(['admin','manager','user']),GuideController.TopGuiders);


module.exports = router;