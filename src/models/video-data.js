const mongoose = require('mongoose')

const Video_Data = mongoose.model('Video-Data', {
    id_video: {
        type: Video,
        required: true
    },
    likes: {
        type: Number,
        required: true
    },
    disLikes: {
        type: Number,
        required: true
    },
    comments: {
        type: [{ comment: String, date: Date }],
        required: true
    }
})

module.exports = Video_Data