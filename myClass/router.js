const express = require('express')
const router = express.Router()
const service = require('./service.js')
router.get('/',service.readIndex)
router.post('/add',service.add)
router.get('/towrite',service.towrite)
router.post('/write',service.write)
router.get('/delete',service.delete)
router.get('/searchAll',service.search)
module.exports = router

