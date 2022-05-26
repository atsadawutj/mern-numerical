const express = require('express')
const router = express.Router()
const bsController = require('../controllers/bsController')

router.route('/')
    .get(bsController.getBisection)
    .post(bsController.postBisection)

module.exports = router