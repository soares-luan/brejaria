process.env.MONGODB = "mongodb://localhost:27017/estudBr"
let req = require('request-promise')
let cheerio = require('cheerio')
let co = require('co')
const db = require('mongoco')

let obj,arquivo

let buscaLink = function(index,variante,padraoLink,classeLink){
	return co(function* (){
		let url = padraoLink.replace('variante',variante).replace('indice',index)
		console.log('Buscando URL',url)
		let res = yield req.get(url)
		
		const $ = cheerio.load(res)
		let itens = $(classeLink)
		let links = []

		itens.each((i,item)=>{
			let link = $(item).find('a').attr('href')
			if(link)
			links.push(link)
		})
		return links
	})
}

let batch = function(obj){
	return co(function* (){
		let {padraoLink,variantes,classeLink} = obj
		
		let links = []
		while(variantes.length > 0){
			let hasData = true
			let i = 1
			variante = variantes.shift()
			while(hasData){
				let retorno = yield buscaLink(i,variante,padraoLink,classeLink)
				let dadoNovo = false
				if(retorno.length == 0){
					hasData = false
					continue
				}

				while(retorno.length > 0){
					let link = retorno.shift()
					if(links.indexOf(link) == -1){
						dadoNovo = true
						links.push(link)
					}
				}

				if(dadoNovo){
					i++
				}else{
					hasData = false
				}
			}
		}
		console.log('Fim batch',links.length)

		return links

	})
}


let trataResultado = function(arr,site){
	return co(function* (){
		let novos = 0
		while(arr.length > 0){
			let link = arr.shift()
			if(site.links.indexOf(link) == -1){
				novos++
				site.links.push(link)
			}
			
		}
		let res = yield db.findOneAndUpdate('cervejarias',site._id,{$set:{links:site.links}})
		console.log('Quantidade Adicionados',novos)
		return novos
	})
}

let inicia = function(nomeSite){
	return co(function* (){
		console.log('Buscando Site',nomeSite)
		
		let site = yield db.findOne('cervejarias',{site:nomeSite}).catch(e=>{
			console.log(e)
		})
		console.log('Dados Encontrados',site._id)

		batch(site).then(res=>{
			trataResultado(res,site)
		})
		.then(res=>{
			console.log(res)
			"FIM"
		})
		.catch(e=>{
			console.log(e)
		})
	})

}

module.exports = inicia
//inicia('emporio')