const mongoose = require('mongoose')
const Event = require('../models/events.model')


module.exports.create = (req, res, next) => {
    res.render('create', { event: new Event() })
}

module.exports.doCreate = (req, res, next) => {
    console.log(req.body)
    const event = new Event({
        title: req.body.title,
        description: req.body.description,
        categories: req.body.categories,
        location: req.body.location,
        time: req.body.time
    });

    event.save()
        .then(() => res.redirect('/events'))
        .catch((error) => {
            console.log(error)
            if (error instanceof mongoose.Error.ValidationError) {
                res.render('create', {
                    event,
                    errors: error.errors
                })
            } else {
                next(error)
            }
        });
}

module.exports.list = (req, res, next) => {
    const criteria = {};

    if (req.query.title) {
        criteria.title = new RegExp(req.query.title, 'i');
    }

    Event.find(criteria)
        .sort({ _id: -1 })
        .then(events => res.render('events', {
            events,
            JSONPlaces: JSON.stringify(events),
            title: req.query.title
        }))
        .catch(error => next(error));
}