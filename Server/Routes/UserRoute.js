const express = require('express');
const router = express.Router();

const UserController = require('../Controllers/UserController');

router.post('/SignUp',UserController.SignUp);
router.post('/Login',UserController.Login);

module.exports = router;