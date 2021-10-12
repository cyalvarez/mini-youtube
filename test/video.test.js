require('dotenv').config({ path: '.env.test' })
const request = require('supertest')
const app = require('../src/app')
const { objVideo } = require('./fixtures/db')
const Video = require('../src/models/video')


//before(setupDatabase)

test('Should signup a video', async () => {
    await request(app)
        .post('/api/video')
        .attach('image', 'test/fixtures/conejo.jpg')
        .attach('video', 'test/fixtures/BigBuckBunny.mp4')
        .field('title', objVideo.title)
        .field('tags', objVideo.tags)
        .expect(200)

    const video = await Video.findOne()
    expect(video).not.toBeNull()
})

//beforeEach(setupDatabase)

test('Should not signup mp4 video', async () => {
    await request(app)
        .post('/api/video')
        .attach('image', 'test/fixtures/conejo.jpg')
        .attach('video', 'test/fixtures/BigBunny.mkv')
        .field('title', objVideo.title)
        .field('tags', objVideo.tags)
        .expect(400)
})


test('Should get videos', async () => {
    await request(app)
        .get('/api/videos/')
        .send()
        .expect(200)
    const video = await Video.find()
    expect(video).not.toBeNull()
})


test('Should not get videos if query string not exists', async () => {
    await request(app)
        .get('/api/videos?term1=oso')
        .send()
        .expect(400)
})


test('Should get video by id', async () => {
    let _id = await Video.findOne({}, "_id")
    _id = _id._id.toHexString()
    await request(app)
        .get('/video/' + _id)
        .send()
        .expect(200)
})

test('Should get not content when id user no exist', async () => {
    await request(app)
        .get('/video/' + '616605acc5d6ea13d40b50db')
        .send()
        .expect(204)
    //console.log(response.request.Test.url)
})
