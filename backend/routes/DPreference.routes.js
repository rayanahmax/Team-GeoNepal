const express = require('express')
const { createDPreference, getAllPreference } = require('../controller/DPreference.controller')
const router = express.Router()

router.post('/create', createDPreference)
router.get('/', getAllPreference)


module.exports = router