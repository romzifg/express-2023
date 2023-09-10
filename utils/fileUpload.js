const multer = require('multer');

const FILE_TYPE = {
    'image/png': 'png',
    'image/jpg': 'jpg',
    'image/jpeg': 'jpeg',
}

const storageFile = multer.diskStorage({
    destination: function (req, file, callback) {
        const isValidFormat = FILE_TYPE[file.mimetype]
        let uploadErr = new Error("Invalid Format File")

        if (isValidFormat) {
            uploadErr = null
        }

        callback(uploadErr, 'public/uploads')
    },
    filename: function (req, file, cb) {
        const fileName = file.originalname.split(' ').join('-')
        const uniqueFilename = Date.now() + "-" + fileName

        cb(null, uniqueFilename)
    }
})

exports.uploadOption = multer({ storage: storageFile })