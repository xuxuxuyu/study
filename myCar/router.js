const express = require('express')
const router = express.Router()
const service = require('./service.js')
//获取首页路由
router.get('/',service.renderIndex)
//添加汽车路由
router.post('/add',service.add)
//删除汽车
router.post('/delete',service.delete)
//获取修改的页面
router.get('/towrite',service.towrite)
router.post('/write',service.write)
router.get('/search',service.search)
router.get('/big',service.big)
router.get('/small',service.small)

module.exports = router