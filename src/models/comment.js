const mongoose = require('mongoose')

const commentShema = new mongoose.Schema({
    comment: {
        type: String,
        required: true,
        trim: true
    },
    idvideo: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'Video'
    }
},
    {
        timestamps: true
    }
)


const Comment = mongoose.model('Comment', commentShema)

module.exports = Comment