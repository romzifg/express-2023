const express = require('express');
const app = express();
const CategoriesRouter = require('./routes/categories');
const AuthRouter = require('./routes/auth');
const ProductRouter = require('./routes/product');
const ProductStockRouter = require('./routes/productStock');
const ProductImageRouter = require('./routes/productImage');
const CouponRouter = require('./routes/coupon');
const CartRouter = require('./routes/cart');
const TransactionRouter = require('./routes/transaction');
const UploadRouter = require('./routes/upload');
const morgan = require('morgan');
const cors = require('cors');
const cookieParse = require('cookie-parser');
const path = require('path');
const helmet = require('helmet');
const { rateLimit } = require('express-rate-limit');
require('dotenv').config();

const limiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    limit: 100,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
})

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParse())
app.use(morgan("dev"))
app.use(cors())
app.use(helmet())
app.use(limiter)

var dir = path.join(__dirname, 'public');
app.use('/public', express.static(dir));

// Routing
app.use('/api/v1/auth', AuthRouter)
app.use('/api/v1/categories', CategoriesRouter)
app.use('/api/v1/product', ProductRouter)
app.use('/api/v1/product-stock', ProductStockRouter)
app.use('/api/v1/product-image', ProductImageRouter)
app.use('/api/v1/coupon', CouponRouter)
app.use('/api/v1/cart', CartRouter)
app.use('/api/v1/transaction', TransactionRouter)
app.use('/api/v1/upload', UploadRouter)

app.listen(process.env.PORT, () => {
    console.log(`server running in port ${process.env.PORT}`)
})