const express = require('express')
const router = new express.Router()

const Comment = require('../models/comment')
const Video = require('../models/video')

router.post('/comment', async (req, res) => {
    try {
        const video = await Video.findById(req.body.idvideo, '_id')
        if (!video) {
            return res.status(204).send()
        }
        const response = await new Comment(req.body).save()
        res.status(201).send(response)
    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router