const express = require('express')
const router = express.Router()
const onepointController = require('../controllers/onepointController')

router.route('/')
    .get(onepointController.getOnepoint)

module.exports = router