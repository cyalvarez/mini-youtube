const express = require('express')
const router = new express.Router()

const Comment = require('../models/comment')

router.post('/comment', async (req, res) => {
    try {
        const comment = new Comment(req.body)
        const response = await comment.save()
        res.status(200).send(response)
    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router