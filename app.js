const express = require('express');
const app = express();
const CategoriesRouter = require('./routes/categories');
const morgan = require('morgan');
require('dotenv').config()

// Middleware
app.use(express.json())
app.use(morgan("dev"))

// Routing
app.use('/api/v1/categories', CategoriesRouter)

app.listen(process.env.PORT, () => {
    console.log(`server running in port ${process.env.PORT}`)
})