const express = require('express')
const router = new express.Router()

const Comment = require('../models/comment')

router.post('/comment', async (req, res) => {
    const comment = new Comment(req.body)
    const response = await comment.save()
    res.status(200).send(response)
})

/*router.get('/comment/:id', async (req, res) => {
    const ObjectId = require('mongoose').Types.ObjectId
    const _idvideo = req.params.id
    const id = new ObjectId(_idvideo)
    console.log(id)
    const comments = await Comment.find({ idvideo: id }).lean()
    // console.log(video)
    res.send(comments)
})*/

module.exports = router