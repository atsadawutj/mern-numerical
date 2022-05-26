const mongoose = require('mongoose')
const { Schema } = mongoose;

const diffSchema = new Schema({
    expr: String,
    x: Number,
    h: Number,
})

module.exports = mongoose.model('diff', diffSchema)