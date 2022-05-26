const bisection = require('../model/Bisection')

const getBisection = async (req, res) => {
    const result = await bisection.find()
    if(!result) return res.status(204).json({ 'message': 'No data found'})
    res.json(result)
}

const postBisection = async (req, res) => {
    const {expr, xl, xr} = req.body
    if(!expr || !xl || !xr) {
        res.status(400).json({'message': 'equation, xl, xr are required'})
    }
    try{
        const result = await bisection.create({
            expr,
            xl,
            xr
        })
        res.status(201).json(result)
    } catch (err) {
        console.error(err)
    }
}

module.exports = { getBisection, postBisection }