const cloudinary = require('./cloudinary.service')

exports.uploadImage = async (file, folder) => {
  try {
    const result = await cloudinary.uploadImage(file, folder)
    return result.secure_url
  } catch (e) {
      console.log(e)
    throw Error(e)
  }
}


exports.uploadVideo = async (file, folder) => {
    try {
      const result = await cloudinary.uploadVideo(file,folder)
      return result.secure_url
    } catch (e) {
        console.log(e)
      throw Error(e)
    }
  }