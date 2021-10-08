const mongoose = require('mongoose')


const Video = mongoose.model('Video', {
    title: {
        type: String,
        required: true,
        trim: true
    },
    url: {
        type: String,
        required: true
    },
    img: {
        type: String
    }
})

module.exports = Video