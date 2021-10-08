const express = require('express')
const multer = require('multer')
const Video = require('../models/video')
const router = new express.Router()
const fs = require("fs")


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


router.post('/videos', upload.fields([{ name: 'video', maxCount: 1 }, { name: 'image', maxCount: 1 }]), async (req, res) => {

    console.log(req.body)
    console.log(req.files)
    var img = fs.readFileSync(req.files.image[0].path);
    var encode_img = img.toString('base64');
    console.log(typeof req.files.video[0].path)
    var objvideo = {
        title: req.body.title,
        url: req.files.video[0].path,
        img: encode_img
    }
    const video = new Video(objvideo)
    await video.save()
    res.status(201).send({ prueba: objvideo })


})


router.get('/videos', async (req, res) => {

    let videos = await Video.find({}).lean()
    videos.map((video) => {
        delete video.url
        return video
    })

    res.status(200).send(videos)
})


router.get('/videos/:id', async (req, res) => {
    const range = req.headers.range
    if (!range) {
        res.status(400).send("Requieres range header")
    }

    const _id = req.params.id
    const { url } = await Video.findById(_id, 'url')

    const videoPath = url.replace('\\', '\\\\')
    const videoSize = fs.statSync(videoPath).size
    const chunk_size = 10 ** 6
    const start = Number(range.replace(/\D/g, ""))
    const end = Math.min(start + chunk_size, videoSize - 1)

    const contentLength = end - start + 1
    const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "video/mp4"

    }

    res.writeHead(206, headers)

    const videoStream = fs.createReadStream(videoPath, { start, end })

    videoStream.pipe(res)

})

module.exports = router