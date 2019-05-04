const express = require('express');
const router = express.Router();
const controller= require('../controllers/events.controller');



router.get('/events', controller.event)

module.exports = router