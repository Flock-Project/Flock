const express = require('express');
const router = express.Router();
const controller = require('../controllers/events.controller');
const secure = require('../middlewares/secure.mid');

router.get('/events/create',  secure.isAuthenticated, controller.create);
router.post('/events',  secure.isAuthenticated, controller.doCreate);

router.get('/events', secure.isAuthenticated, controller.list)

router.get('/events/coordinates', controller.coordinates);

router.post('/events/:id/join', controller.join);

router.post('/events/:id/leave', controller.leave);

router.get('/events/:eventId', controller.eventDetail);



module.exports = router