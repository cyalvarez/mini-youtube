const mongoose = require('mongoose')

const videoShema = new mongoose.Schema({
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
    },
    tags: {
        type: [String],
        required: true,
        default: []
    },
    likes: {
        type: Number,
        required: true,
        default: 0
    },
    dislikes: {
        type: Number,
        required: true,
        default: 0
    }
},
    {
        timestamps: true
    }
)

videoShema.virtual('comments', {
    ref: 'Comment',
    localField: '_id',
    foreignField: 'idvideo'
})


const Video = mongoose.model('Video', videoShema)

module.exports = Video