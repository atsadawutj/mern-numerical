const mongoose = require('mongoose')
const { Schema } = mongoose;

const integrateSchema = new Schema({
    expr: String,
    a: Number,
    b: Number
})

module.exports = mongoose.model('integrate', integrateSchema)