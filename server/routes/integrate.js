const express = require('express')
const router = express.Router()
const integrateController = require('../controllers/integrateController')

router.route('/')
    .get(integrateController.getIntegrate)

module.exports = router