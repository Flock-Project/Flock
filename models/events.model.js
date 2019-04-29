const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title:{
        type: String,
        required: [true, 'Title is required']
    },
    location:{
        type: String,
        required: [true, 'Location is required']
    },
    time: {
        startTime: Date,
        endTime: Date,
    },description:{
        type: String,
        required: [true, 'Description is required']
    }

})


const Event = mongoose.model('Event', eventSchema);
module.exports = Event;