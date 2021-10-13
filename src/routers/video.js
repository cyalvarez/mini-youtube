const express = require('express')
const router = new express.Router()
const multer = require('multer')

const videoController = require('../controllers/video')

const videoStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === "video") {
            cb(null, 'videos');
        } else {
            cb(null, 'images');
        }
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now() + file.originalname);
    }
})

const upload = multer({
    storage: videoStorage,
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

router.patch('/likes/:id', videoController.patchLikes)

router.patch('/dislikes/:id', videoController.postDisLikes)

module.exports = router