const integrate = require('../model/Integrate')

const getIntegrate = async (req, res) => {
    const result = await integrate.find()
    if(!result) return res.status(204).json({ 'message': 'No data found'})
    res.json(result)
}

module.exports = { getIntegrate }