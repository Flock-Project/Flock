const express = require('express');
const router = express.Router();
const controller= require('../controllers/register.controller');
const profileController = require('../controllers/profile.controller');
const secure = require('../middlewares/secure.mid');



router.get('/', controller.register)
router.post('/', controller.doRegister)
router.get('/profile', secure.isAuthenticated, profileController.profile);
router.post('/profile', secure.isAuthenticated, profileController.doProfile);





module.exports = router;