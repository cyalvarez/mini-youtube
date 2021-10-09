const mongoose = require('mongoose')

const Tag = mongoose.model('Tag', {
    tag: {
        type: String,
        required: true
    },
    videos: {
        type: [Number],
        required: true
    }
})

module.exports = Tag