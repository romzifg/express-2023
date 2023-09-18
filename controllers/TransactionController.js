const {
    Product,
    Transaction,
    TransactionItem,
    TransactionLog
} = require('../models')
const { apiResponse } = require('../utils/response')

exports.getTransactions = async (req, res) => {
    try {
        const transaction = await Transaction.findAll({
            include: [
                {
                    model: TransactionItem, as: 'items', include: [
                        { model: Product, as: 'product' }
                    ]
                },
                { model: TransactionLog, as: 'logs' }
            ]
        })

        return apiResponse({
            statusCode: 200,
            message: 'Success',
            data: transaction
        }, res)
    } catch (error) {
        return apiResponse({
            statusCode: 400,
            message: error.message
        }, res)
    }
}

exports.getTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findOne({
            where: { transaction_id: req.params.id },
            include: [
                {
                    model: TransactionItem, as: 'items', include: [
                        { model: Product, as: 'product' }
                    ]
                },
                { model: TransactionLog, as: 'logs' }
            ]
        })

        return apiResponse({
            statusCode: 200,
            message: 'Success',
            data: transaction
        }, res)
    } catch (error) {
        return apiResponse({
            statusCode: 400,
            message: error.message
        }, res)
    }
}

exports.getLogs = async (req, res) => {
    try {
        const logs = await TransactionLog.findAll()

        return apiResponse({
            statusCode: 200,
            message: 'Success',
            data: logs
        }, res)
    } catch (error) {
        return apiResponse({
            statusCode: 400,
            message: error.message
        }, res)
    }
}

exports.uploadAttachment = async (req, res) => {
    try {
        const transaction = await Transaction.findOne({ where: { transaction_id: req.params.id } })
        if (!transaction) {
            return apiResponse({
                statusCode: 404,
                message: 'Not Found',
                data: null
            }, res)
        }

        if (!req.body.attachment_transaction && req.body.attachment_transaction === null) {
            return apiResponse({
                statusCode: 400,
                message: 'Attachment Empty'
            }, res)
        }
        await transaction.update({
            attachment_transaction: req.body.attachment_transaction
        })

        return apiResponse({
            statusCode: 200,
            message: 'Success',
            data: transaction
        }, res)
    } catch (error) {
        return apiResponse({
            statusCode: 400,
            message: error.message
        })
    }
}

exports.confirmTransaction = async (req, res) => {
    try {
        let status;
        const transaction = await Transaction.findOne({ where: { transaction_id: req.params.id } })
        if (!transaction) {
            return apiResponse({
                statusCode: 404,
                message: 'Not Found',
                data: null
            }, res)
        }

        if (req.body.status === 'approve') {
            status = 'SUCCESS'
        } else {
            status = 'REJECT'
        }
        const newTransaction = await transaction.update({
            status: status
        })

        return apiResponse({
            statusCode: 200,
            message: 'Success',
            data: newTransaction
        }, res)
    } catch (error) {
        return apiResponse({
            statusCode: 400,
            message: error.message
        })
    }
}