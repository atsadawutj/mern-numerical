const mongoose = require('mongoose')
require('dotenv').config()

const uri = 'mongodb+srv://pepsi:1234@cluster0.tt7nc.mongodb.net/NumerDB?retryWrites=true&w=majority'

const connectDB = async () => {
    mongoose
    .connect(uri, { useNewUrlParser: true, useUnifiedTopology: false })
    .then(() => {
        console.log('Connect to database success')
    })
    .catch((err) => {
        console.log(err)
    })
}

module.exports = connectDB