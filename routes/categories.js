const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        message: "Hello World"
    })
})
router.post('/', (req, res) => {
    res.json({
        message: "Response Post"
    })
})
router.get('/:name', (req, res) => {
    res.json({
        message: `${req.params.name}`
    })
})

module.exports = router
