const User = require('../model/User');
const bcryptjs = require('bcryptjs');

const handleRegister = async (req, res) => {
    const { user, pwd } = req.body;
    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });

    try {
        const hashedPwd = await bcryptjs.hash(pwd, 10);
        const result = await User.create({
            "username": user,
            "password": hashedPwd
        });

        res.status(201).json({ 'success': `New user created!` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { handleRegister };