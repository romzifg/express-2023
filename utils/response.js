exports.apiResponse = (payload, res) => {
    if (payload.statusCode === 200 || payload.statusCode === 201) {
        return res.status(payload.statusCode).json({
            status: payload.statusCode,
            message: payload.message ?? 'Success',
            data: payload.data
        })
    }
    if (payload.statusCode === 404) {
        return res.status(payload.statusCode).json({
            status: payload.statusCode,
            message: 'Not Found',
            data: payload.data
        })
    }
    if (payload.statusCode === 400) {
        return res.status(payload.statusCode).json({
            status: payload.statusCode,
            message: 'Fail',
            error: payload.message
        })
    }
}