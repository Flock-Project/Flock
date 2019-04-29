const mongoose = require('mongoose');
const EVENT_CATEGORIES = ['Hangout', 'Grab some food', 'Watch a movie', 'Go to the theater', 'Grab a drink']


const eventSchema = new mongoose.Schema({
    title:{
        type: String,
        required: [true, 'Title is required']
    },
    location:{
        type: String,
        required: [true, 'Location is required']
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
        type: [String],
        enum: EVENT_CATEGORIES,
        default: []    
    }


})


const Event = mongoose.model('Event', eventSchema);
module.exports = Event;