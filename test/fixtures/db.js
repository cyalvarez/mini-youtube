const mongoose = require('mongoose')
const Video = require('../../src/models/video')
const Comment = require('../../src/models/comment')

//const idVideo = new mongoose.Types.ObjectId()

const objVideo = {
    title: 'Atardecer',
    tags: 'familia sol alegria',
    description:'dia soleado'
}



const setupDatabase = async () => {
    await Video.deleteMany()
    await Comment.deleteMany()
}

module.exports = {
    objVideo,
    setupDatabase
}