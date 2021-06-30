const express = require('express')
const app = express()
const template = require('art-template')
const path = require('path')
const router = require('./router.js')
app.engine('art',require('express-art-template'))
app.set('views',path.join(__dirname,'view'))
app.set('view engine','art')
app.use(express.urlencoded({extended:false}))
app.use(router)

app.listen(3000,()=>{
	console.log('running。。。')
})
