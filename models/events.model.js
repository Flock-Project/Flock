const mongoose = require('mongoose');
const EVENT_CATEGORIES = ['social', 'drinks', 'shows', 'tourism', 'food', 'dance', 'sports', 'activities']


const eventSchema = new mongoose.Schema({
    title:{
        type: String,
        required: [true, 'Title is required']
    },
    description:{
        short: {
            type: String,
            default: '',
            required: [true, 'Description is required']

          },
          long: {
            type: String,
            default: '',
            required: [true, 'Description is required']
          }
    },
    time: {
        type: String,
        required: [true]

    },
    categories: {
        type: String,
        enum: EVENT_CATEGORIES,
        default: 'social',
        required: true
    },
    location: {
        type: {
            type: String,
            default: 'Point'
        }, 
        coordinates: [Number]
    }

}, { timestamps: true });

eventSchema.index({ location: '2dsphere'});


const Event = mongoose.model('Event', eventSchema);
module.exports = Event;