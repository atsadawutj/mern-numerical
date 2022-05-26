const onepoint = require('../model/Onepoint')

const getOnepoint = async (req, res) => {
    const result = await onepoint.find()
    if(!result) return res.status(204).json({ 'message': 'No data found'})
    res.json(result)
}

module.exports = { getOnepoint }