const express = require('express')
const router = new express.Router()


router.get('/upload', (req, res) => {
	res.render('upload', {
	})
})

router.get('/video/:id', (req, res) => {
	res.render('video', {
	})
})

router.get('/search', (req, res) => {
	res.render('search', {
	})
})

module.exports = router