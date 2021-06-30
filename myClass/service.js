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

exports.readIndex=(req,res)=>{
	res.render("index",{list:data})
}

exports.add = (req,res)=>{
	console.log('111')
	let info = req.body
	let arr = []
	data.forEach(item=>{
		arr.push(item.id)
	})
	let idMax = Math.max.apply(null,arr)
	info.id = idMax+1
	data.push(info)
	writeFileToJson(res)
}

exports.towrite = (req,res)=>{
    let id = req.query.id;
    data.forEach((item)=>{
        if(id==item.id)
        {
            res.send(item);
            return;
        }
    })
}

exports.write = (req,res)=>{
	let info = req.body
	console.log(info.id)
	console.log(info)
	data.forEach(item=>{
		if(item.id == info.id){
			for(key in item){
				item[key] = info[key]
			}
		}
		writeFileToJson(res)
		return
	})
	
}
exports.delete = (req,res)=>{
	let id = req.body.id;
    data.forEach((item,index)=>{
        if(item.id == id)
        {   
            data.splice(index,1);
        }
        return;
    })
	writeFileToJson(res)
}
exports.searchAll = (req,res)=>{
	res.render("score",{list:data})
}
