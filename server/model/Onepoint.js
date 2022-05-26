const mongoose = require('mongoose')
const { Schema } = mongoose;

const onepointSchema = new Schema({
    expr: String,
    x: Number
})

module.exports = mongoose.model('onepoint', onepointSchema)