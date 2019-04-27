const express = require('express');
const router = express.Router();
const controller= require('../controllers/login.controller');
const profileController = require('../controllers/profile.controller')
const secure = require('../middlewares/secure.mid');


router.get('/', controller.login)
router.post('/', controller.doLogin)
router.get('/profile', secure.isAuthenticated, controller.profile);
router.post('/profile', secure.isAuthenticated, controller.doProfile);



module.exports = router;