require('dotenv').config();
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const connectDB = require('./dbConn')
const verifyJWT = require('./middleware/verifyJWT')
require('dotenv').config()
const swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./swagger.json')
connectDB()     

app.use(cors())
app.use(express.urlencoded({ extended: false}))
app.use(express.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));

app.use(verifyJWT)
app.use('/bisection', require('./routes/bisection'))
app.use('/onepoint', require('./routes/onepoint'))
app.use('/integrate', require('./routes/integrate'))  
app.use('/diff', require('./routes/diff'))  

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(3500, () => {
        console.log('App listen at port 3500')
    })
})