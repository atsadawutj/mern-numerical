const mongoose = require('mongoose')
const { Schema } = mongoose;

const bisectionSchema = new Schema({
    expr: String,
    xl: Number,
    xr: Number,
})

module.exports = mongoose.model('bisection', bisectionSchema)