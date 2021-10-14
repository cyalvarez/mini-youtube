require('dotenv').config({ path: '.env.test' })
const request = require('supertest')
const app = require('../src/app')
const { objVideo, setupDatabase } = require('./fixtures/db')
const Video = require('../src/models/video')


describe('Create video', () => {

    beforeEach(setupDatabase);

    test('Should upload a video', async () => {
        await request(app)
            .post('/api/video')
            .attach('image', 'test/fixtures/conejo.jpg')
            .attach('video', 'test/fixtures/BigBuckBunny.mp4')
            .field('title', objVideo.title)
            .field('tags', objVideo.tags)
            .field('description', objVideo.description)
            .expect(201)

        const video = await Video.findOne()
        expect(video).not.toBeNull()
    })

});


test('Should not upload mp4 video', async () => {
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


test('Should get not content when id video not exists', async () => {
    await request(app)
        .get('/video/' + '616605acc5d6ea13d40b50db')
        .send()
        .expect(204)
})


test('Should increase the likes of the video', async () => {
    let { _id, likes } = await Video.findOne({}, "_id likes")
    _id = _id._id.toHexString()
    const res = await request(app)
        .patch('/api/video/likes/' + _id)
        .send()
        .expect(200)

    expect(res.body.likes).toBeGreaterThan(likes);
})


test('Should fail to update likes if video does not exist', async () => {
    const res = await request(app)
        .patch('/api/video/likes/' + '616605acc5d6ea13d40b50db')
        .send()
        .expect(400)
})


test('should create comment', async () => {
    let { _id } = await Video.findOne({}, "_id likes")
    _id = _id._id.toHexString()
    await request(app)
        .post('/api/comment')
        .send({
            "comment": "test comment",
            "idvideo": _id
        })
        .expect(201)
})


test('Should fail to add comment if video does not exist', async () => {

    await request(app)
        .post('/api/comment')
        .send({
            "comment": "test comment",
            "idvideo": "616605acc5d6ea13d40b50db"
        })
        .expect(204)
})

