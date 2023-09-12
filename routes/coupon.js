const express = require('express');
const router = express.Router();
const CouponController = require('../controllers/CouponController')
const { authMiddleware } = require('../middleware/UserMiddleware')

router.get('/', CouponController.getAllCoupons)
router.get('/:id', authMiddleware, CouponController.getCoupon)
router.post('/', authMiddleware, CouponController.createCoupon)
router.put('/:id', authMiddleware, CouponController.updateCoupon)
router.delete('/:id', authMiddleware, CouponController.destroyCoupon)

module.exports = router
