const fs = require("fs")
const Video = require('../models/video')


exports.getVideoData = async (idVideo) => {
    const video = await Video.findOne({ _id: idVideo }, 'title url tags likes dislikes').populate('comments').lean()
    return video
}

exports.postVideo = async (req, res) => {
    const { path } = req.files.image[0]
    const img = fs.readFileSync(path)
    const encode_img = img.toString('base64')

    fs.unlinkSync(path)

    var objvideo = {
        title: req.body.title,
        url: req.files.video[0].path,
        img: encode_img,
        tags: req.body.tags.replace(/\s\s+/g, ' ').split(' ')
    }

    const video = new Video(objvideo)
    await video.save()
    res.render('index')
}

exports.getVideos = async (req, res) => {
    try {
        const searchTerm = req.query.term;
        let videos = []
        if (searchTerm) {
            const videosByTitle = await Video.find({ title: { "$regex": searchTerm, "$options": "i" } }, 'title img').lean()
            const videosByTags = await Video.find({ tags: { "$regex": "^" + searchTerm + "$", "$options": "i" } }, 'title img').lean()
            videos = [...videosByTitle, ...videosByTags]
        } else {
            videos = await Video.find({}, 'title img').lean()
        }
        res.status(200).send(videos)
    } catch (e) {
        res.status(500).send(e)
    }
}

exports.getVideoById = async (req, res) => {
    try {
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
    } catch (e) {
        res.status(500).send(e)
    }
}

exports.postLikes = async (req, res) => {

    const id = Object.keys(req.params.id)
    try {
        const video = await Video.findByIdAndUpdate(req.params.id, { $inc: { likes: 1 } }, { new: true, runValidators: true })
        res.status(200).send({ likes: video.likes })
    } catch (e) {
        res.status(400).send(e)
    }
}

exports.postDisLikes = async (req, res) => {
    const id = Object.keys(req.params.id)
    console.log(id)
    try {
        const video = await Video.findByIdAndUpdate(req.params.id, { $inc: { dislikes: 1 } }, { new: true, runValidators: true })
        res.status(200).send({ dislikes: video.dislikes })
    } catch (e) {
        res.status(400).send(e)
    }
}