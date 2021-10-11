const express = require('express')
const router = new express.Router()

const videoController = require('../controllers/video')

router.get('/upload', (req, res) => {
	res.render('upload', {
	})
})

router.get('/video/:id', async (req, res) => {
	const videoData = await videoController.getVideoData(req.params.id);
	res.render('video', {
		title: videoData.title,
		tags:videoData.tags,
		comments: videoData.comments ? videoData.comments.map((elm) => {
			elm.createdAt = elm.createdAt.toLocaleDateString('en-US')
			return elm
		}) : [],
		likes: videoData.likes || 0,
		dislikes: videoData.dislikes || 0
	})
})

router.get('/search', (req, res) => {
	res.render('search', {
	})
})

module.exports = router