const Event = require('../models/events.model')


module.exports.event = (req, res, next) => {
    Event.find()
        .then((events) => res.json(events.map(e => e.location)))
        .catch(next)      
};