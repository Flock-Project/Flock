const express = require('express');
const Router = express.Router();
const Place = require('../models/places.model');


Router.post('/events', (req, res, next) => {
    let location = {
        type: 'Point', 
        coordinates: [req.body.longitude,  req.body.latitude]
    };

    const newPlace = new Place({
        name: req.body.name,
        categories: req.body.categories,
        description: req.body.description,
        location: location
    });

    newPlace.save((error) => {
        if (error){
            next(error);
        } else{
            res.redirect('/events')
        }
    })
});

module.exports = Router