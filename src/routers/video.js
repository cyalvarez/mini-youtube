const express = require('express')
const router = new express.Router()
const multer = require('multer')

const videoController = require('../controllers/video')


const upload = multer({
    limits: {
        fileSize: 5000000
    },
    fileFilter(req, file, cb) {
        if (file.fieldname == 'video') {
            if (!file.originalname.match(/\.(mp4)$/)) {
                return cb(new Error('Please upload a video mp4'))
            }
            cb(null, true);
        } else {
            if (!file.originalname.match(/\.(png|jpg)$/)) {
                return cb(new Error('Please upload a Image png or jpg'))
            }
            cb(null, true);
        }
    }
})

router.post('/video', upload.fields([{ name: 'video', maxCount: 1 }, { name: 'image', maxCount: 1 }]), videoController.postVideo, (error, req, res, next) => {
   res.status(400).send({ error: error.message })
})

router.get('/videos', videoController.getVideos)

router.get('/video/:id', videoController.getVideoById)

router.patch('/video/likes/:id', videoController.patchLikes)

router.patch('/video/dislikes/:id', videoController.postDisLikes)

module.exports = router