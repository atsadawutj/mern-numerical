const diff = require('../model/Diff')

const getDiff = async (req, res) => {
    const result = await diff.find()
    if(!result) return res.status(204).json({ 'message': 'No data found'})
    res.json(result)
}

module.exports = { getDiff }