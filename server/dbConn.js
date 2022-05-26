const mongoose = require('mongoose')

const connectDB = async () => {
    mongoose
    .connect(process.env.DATABASE_URI, { useNewUrlParser: true, useUnifiedTopology: false })
    .then(() => {
        console.log('Connect to database success')
    })
    .catch((err) => {
        console.log(err)
    })
}

module.exports = connectDB