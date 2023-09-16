const { apiResponse } = require('../utils/response');

exports.single = async (req, res) => {
    const file = req.file;
    if (!file) {
        res.status(400)
        throw new Error('File is empty')
    }

    const filename = file.filename
    const pathFile = `${req.protocol}://${req.get('host')}/public/uploads/${filename}`

    return apiResponse({
        statusCode: 200,
        message: 'Success',
        data: pathFile
    }, res)
}

exports.multiple = async (req, res) => {
    const file = req.files;
    if (file.length === 0) {
        res.status(400)
        throw new Error('File is empty')
    }

    let files = []
    file.forEach((el) => {
        const filename = el.filename
        const pathFile = `${req.protocol}://${req.get('host')}/public/uploads/${filename}`
        files.push(pathFile)
    })

    return apiResponse({
        statusCode: 200,
        message: 'Success',
        data: files
    }, res)
}