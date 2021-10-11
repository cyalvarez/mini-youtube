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
    fileFilter(req, file, cb) {
        if (file.fieldname == 'video') {
            console.log('soy video ' + file.originalname)
            cb(null, true);
        } else {
            console.log('soy imagen ' + file.originalname)
            cb(null, true);
        }
    }
})


router.post('/video', upload.fields([{ name: 'video', maxCount: 1 }, { name: 'image', maxCount: 1 }]), videoController.postVideo)

router.get('/videos', videoController.getVideos)

router.get('/video/:id', videoController.getVideoById)

router.patch('/likes/:id',videoController.postLikes)

router.patch('/dislikes/:id',videoController.postDisLikes)

module.exports = router