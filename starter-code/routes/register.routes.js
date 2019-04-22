const express = require('express');
const router = express.Router();
const register= require('../controllers/register.controller')



router.get('/register', register.register)
router.post('/register', register.doRegister)





module.exports = router;