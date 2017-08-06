let req = require('request-promise')
let cheerio = require('cheerio')
let fs = require('fs')
let co = require('co')


let buscaLink = function(x){
	return co(function* (){
		let res = yield req.get('https://www.clubedomalte.com.br/complexas?pagina='+x)
		
		const $ = cheerio.load(res)
		let itens = $('body .spots-interna .spot')
		let links = []

		itens.each((i,item)=>{
			links.push($(item).find('a').attr('href'))
		})
		return links
	})
}

let batch = function(index){
	return co(function* (){
		console.log('buscando' +index)
		let resLinks = yield [buscaLink(index+1),buscaLink(index+2),buscaLink(index+3),buscaLink(index+4),buscaLink(index+5)]
		let links = []
		while(resLinks.length > 0){
			links.push(...resLinks.shift())
		}


		if(links.length > 0){
			trataResultado(links)
			batch(index + 5)
		}else{
			console.log('Fim')
		}
		
		
	})
}


let trataResultado = function(arr){
	
	let sites = JSON.parse(fs.readFileSync('./brejas.json'))
	
	while(arr.length > 0){
		let link = arr.shift()
		if(sites['https://www.clubedomalte.com.br'].cervejas.indexOf(link) == -1)
		sites['https://www.clubedomalte.com.br'].cervejas.push(link)
	}

	fs.writeFileSync('brejas.json',JSON.stringify(sites))

}

let sites = JSON.parse(fs.readFileSync('./brejas.json'))

console.log(sites['https://www.clubedomalte.com.br'].cervejas.length)