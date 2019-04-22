const express = require('express');
const router = express.Router();
const controller= require('../controllers/register.controller')



router.get('/', controller.register)

router.post('/', controller.doRegister)





module.exports = router;