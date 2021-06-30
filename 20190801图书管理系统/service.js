const data = require('./data.json')
const fs = require('fs')
const path = require('path')
let writeFileToJson = (res)=>{
		fs.writeFile(path.join(__dirname,'data.json'),JSON.stringify(data,null,4),err=>{
		if(err){
			res.send('添加失败')
		}else{
			res.redirect('/')
		}
	})
}
exports.renderIndex = (req,res)=>{
	res.render('index.art',{list:data})
}
exports.toaddBook = (req,res)=>{
	res.render('addBook.art',{})
}
exports.addBook = (req,res)=>{
	let info = req.body
	// console.log('111')
	let arr = []
	data.forEach(item=>{
		arr.push(item.id)
	})
	let idMax = Math.max.apply(null,arr)
	// console.log(idMax)
	info.id = idMax+1
	data.push(info)
	// console.log(data)
	writeFileToJson(res)
}
exports.toEditBook = (req,res)=>{
	let idBook = req.query.id
	let book = {}
	data.forEach(item=>{
		if(item.id == idBook){
			for(key in item){
				book[key] = item[key]
			}
		}
	})
	res.render('editBook.art',book)
}
exports.editBook = (req,res)=>{
	let info = req.body
	data.forEach(item=>{
		if(item.id == info.id){
			for(key in item){
				item[key] = info[key]
			}
		}
		return
	})
	writeFileToJson(res)
}
exports.deleteBook = (req,res)=>{
	let idBook = req.query.id
	data.forEach(item=>{
		if(item.id == idBook)
			data.splice(idBook-1,1)
			return
	})
	writeFileToJson(res)
}
