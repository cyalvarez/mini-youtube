var cloudinary = require('cloudinary').v2
//const dotenv=require('dotenv')
//require('dotenv').config({ path: '.env' })

let streamifier = require('streamifier')

//dotenv.config({ path: '.env' })

/*cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
    
})*/

cloudinary.config({
    cloud_name: 'daliv7p2o',
    api_key: '653982732386197',
    api_secret: 'kBKCTVRsNPP5ntCj1LUUb7kPwyo',

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
            const stream = cloudinary.uploader.upload_stream({ resource_type: "video",folder },
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


