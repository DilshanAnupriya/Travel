const express = require('express');
const router = express.Router();

const GuideController = require('../Controllers/GuiderController');

router.post('/create',GuideController.CreateGuider);
router.get('/find-all',GuideController.FindAllGuider);
router.get('/find-by/:id',GuideController.FindGuiderById);
router.put('/update/:id',GuideController.UpdateGuider);
router.delete('/delete/:id',GuideController.DeleteGuider);
router.get('/top-guiders',GuideController.TopGuiders);


module.exports = router;