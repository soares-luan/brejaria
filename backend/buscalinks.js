let req = require('request-promise')
let cheerio = require('cheerio')
let fs = require('fs')
let co = require('co')

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


let trataResultado = function(arr,arquivo,sites){
	
	while(arr.length > 0){
		let link = arr.shift()
		if(sites.cervejas.indexOf(link) == -1)
		sites.cervejas.push(link)
	}
	fs.writeFileSync(arquivo,JSON.stringify(sites))
}

let inicia = function(site){

	arquivo = `./site_${site}.json`
	const obj_original = JSON.parse(fs.readFileSync(arquivo))
	let objCopia = JSON.parse(JSON.stringify(obj_original));

	batch(objCopia).then(res=>{
		trataResultado(res,arquivo,obj_original)
	}).catch(e=>{
		console.log(e)
	})

}
inicia('emporio')