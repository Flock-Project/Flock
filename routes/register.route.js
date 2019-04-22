const express = require('express');
const router = express.Router();
const controller= require('../controllers/register.controller')



router.get('/register', controller.register)

router.post('/register', controller.doRegister)





module.exports = router;