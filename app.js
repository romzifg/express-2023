const express = require('express');
const app = express();
const CategoriesRouter = require('./routes/categories');
const AuthRouter = require('./routes/auth');
const morgan = require('morgan');
const cors = require('cors');
const { errorHandler, notFound } = require('./middleware/errorMiddleware');
require('dotenv').config()

// Middleware
app.use(express.json())
app.use(morgan("dev"))
app.use(cors())

// Routing
app.use('/api/v1/auth', AuthRouter)
app.use('/api/v1/categories', CategoriesRouter)

// Middleware for error
app.use(notFound)
app.use(errorHandler)

app.listen(process.env.PORT, () => {
    console.log(`server running in port ${process.env.PORT}`)
})