const User = require('../model/User');
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const handleLogin = async (req, res) => {
    const {username, password} = req.body
    if(!username || !password) return res.status(400).json({'message': 'username and password are required'})

    const foundUser = await User.findOne({ username: username }).exec();
    if(!foundUser) return res.sendStatus(401)

    const match = await bcryptjs.compare(password, foundUser.password)

    if(match) {
        const accessToken = jwt.sign(
            {'username': foundUser.username},
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: '365d'}
        )
        res.json({ accessToken })
    } else {
        res.sendStatus(401)
    }
}

module.exports = { handleLogin }