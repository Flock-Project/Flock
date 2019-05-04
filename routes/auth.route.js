const express = require('express');
const router = express.Router();
const controller= require('../controllers/auth.controller');
const secure = require('../middlewares/secure.mid');
const passport = require('passport');
const storage = require('../config/storage.config');


router.get('/register', controller.register);
router.post('/register', controller.doRegister);

router.get('/login', controller.login);
router.post('/login', controller.doLogin);

router.get('/profile', secure.isAuthenticated, controller.profile);
router.post('/profile', secure.isAuthenticated, storage.single('avatar'), controller.doProfile);

router.get('/authenticate/google', passport.authenticate('google-auth', { scope: ['openid', 'profile', 'email'] }))
router.get('/authenticate/:idp/callback', controller.loginWithIDPCallback)


router.get('/create', controller.create);
router.post('/events', controller.doCreate);

router.get('/events', secure.isAuthenticated, controller.list)


router.get('/logout', controller.logout);

module.exports = router;