const mongoose = require('mongoose')
const Event = require('../models/events.model')
const createError = require('http-errors')


module.exports.create = (req, res, next) => {
    res.render('create', { event: new Event() })
}

module.exports.doCreate = (req, res, next) => {
    console.log(req.body)
    const event = new Event({
        title: req.body.title,
        creater: req.body.creater,
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
    const user = req.user
    const criteria = {};

    if (req.query.title) {
        criteria.title = new RegExp(req.query.title, 'i');
    }

    if (req.query.category) {
        criteria.categories = { "$in": [req.query.category] }
    }

    Event.find(criteria)
        .sort({ creationAt: -1 })
        .populate('joiners')
        .then(events => res.render('events', {
            events,
            JSONPlaces: JSON.stringify(events),
            title: req.query.title,
            user
        }))
        .catch(error => next(error));
}

module.exports.eventDetail = (req, res, next) => {
    const id = req.params.eventId;

    Event.findById(id)
        .then(event =>{
            const join = event.joiners.map(el => el.toString()).includes(req.user.id.toString())

            res.render('event-page', { event, join } )
        })
        .catch(next)
}

module.exports.join = (req, res, next) => {
    const id = req.params.id
    req.user

    Event.findByIdAndUpdate(id, { $addToSet: {joiners: req.user.id} }, { new: true })
        .then((event) => {
            if (event) {
                res.redirect(`/events/${id}`)
            } else {
                next(createError(404, 'Event not found'))
            }
        })
        .catch(next)
}

module.exports.leave = (req, res, next) => {
    const id = req.params.id
    req.user

    Event.findByIdAndUpdate(id, { $pull: {joiners: req.user.id} }, { new: true })
        .then((event) => {
            if (event) {
                res.redirect(`/events/${id}`)
            } else {
                next(createError(404, 'Event not found'))
            }
        })
        .catch(next)
}


module.exports.coordinates = (req, res, next) => {
    Event.find()
        .then((events) => res.json(events.map(e => {
            return { ...e.location, eventId: e.id  }
        })))
        .catch(next)
}
