const express = require('express');
const router = express.Router();
const controller= require('../controllers/auth.controller');
const secure = require('../middlewares/secure.mid');


router.get('/register', controller.register)
router.post('/register', controller.doRegister)

router.get('/login', controller.login)
router.post('/login', controller.doLogin)

router.get('/profile', secure.isAuthenticated, controller.profile);
router.post('/profile', secure.isAuthenticated, controller.doProfile);

router.get('/logout', controller.logout);

module.exports = router;