const mongoose = require('mongoose')
const Video = require('../../src/models/video')


//const idVideo = new mongoose.Types.ObjectId()

const objVideo = {
    title: 'Atardecer',
    tags: 'familia sol alegria',
    description:'dia soleado'
}



const setupDatabase = async () => {
    await Video.deleteMany()
}

module.exports = {
    objVideo,
    setupDatabase
}