var cloudinary = require('cloudinary').v2

let streamifier = require('streamifier')

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

exports.uploadImage = (file, folder) => {
    try {
        return new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream({
                folder
            },
                function (e, r) {
                    if (e) {
                        console.log(e)
                        reject(e)
                    }
                    resolve(r)
                })
            streamifier.createReadStream(file.buffer).pipe(stream);
        })
    } catch (e) {
        console.log(e)
        reject(e)
    }

}


exports.uploadVideo = (file, folder) => {
    try {
        return new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream({ resource_type: "video", folder },
                function (e, r) {
                    if (e) {
                        console.log(e)
                        reject(e)
                    }
                    resolve(r)
                })
            streamifier.createReadStream(file.buffer).pipe(stream);
        })
    } catch (e) {
        console.log(e)
        reject(e)
    }

}


