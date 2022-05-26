const express = require('express')
const router = express.Router()
const diffController = require('../controllers/diffController')

router.route('/')
    .get(diffController.getDiff)

module.exports = router