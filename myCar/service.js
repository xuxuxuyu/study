const data = require('./data.json')
const fs = require('fs')
const path = require('path')
//写文件函数封装
let writeFile = (res)=>{
    fs.writeFile('./data.json',JSON.stringify(data,null,4),(err)=>{
        if(err)
        {
            res.send('文件写入失败');
        }
        res.redirect('/');
    })
}
//获取首页
exports.renderIndex = (req,res)=>{
	res.render('index',{list:data})
}
//添加汽车
exports.add = (req,res)=>{
	let info = req.body
	let arr=[]
	data.forEach(item=>{
		arr.push(item.id)
	})
	// console.log(arr)
	// console.log(Math.max.apply(null,arr))
	info.id = Math.max.apply(null,arr)+1
	data.push(info)
	writeFile(res)
}
//删除汽车
exports.delete = (req,res)=>{
	let id = req.body.id
	// console.log(id)
	data.forEach((item,index)=>{
		if(item.id == id){
			data.splice(index,1)
			// console.log(data)
		}
		return
	})
	writeFile(res)
}
exports.towrite = (req,res)=>{
	let id = req.query.id
	console.log(id)
	data.forEach((item)=>{
		if(id==item.id){
			res.send(item)
			return
		}
	})
}
exports.write = (req,res)=>{
	let info = req.body
	console.log('111')
	data.forEach(item=>{
		if(item.id == info.id){
			for(var key in item){
				item[key] = info[key]
			}
			writeFile(res)
			return
		}
	})
	// res.send('111')
}
exports.search = (req,res)=>{
	console.log('11111')
	// res.send('22')
	let info = req.query
	// console.log(info)
	data.forEach(item=>{
		if(info.search==item.name){
			res.render('search.art',{
				id:item.id,
				name:item.name,
				dec:item.dec
			})
		}
	})
	// console.log(info)
}
exports.big = (req,res)=>{
	let id = []
	data.forEach(item=>{
		id.push(item.id)
	})
	console.log(id)
	id.sort((a,b)=>{
		if(a>b){
			return 1
		}else if(a<b){
			return -1
		}else{
			return 0
		}
	})
	// console.log(id)
	data.forEach((item,index)=>{
		// console.log(index)
		item.id = id[index]
	})
	writeFile(res)
}

exports.small = (req,res)=>{
	let id = []
	data.forEach(item=>{
		id.push(item.id)
	})
	console.log(id)
	id.sort((a,b)=>{
		if(a>b){
			return -1
		}else if(a<b){
			return 1
		}else{
			return 0
		}
	})
	data.forEach((item,index)=>{
		item.id = id[index]
	})
	writeFile(res)
}
