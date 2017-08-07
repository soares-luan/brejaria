let req = require('request-promise')
let cheerio = require('cheerio')
let fs = require('fs')
let co = require('co')

co(function *(){
    
let res = yield req.get('http://www.cervejastore.com.br/buscapagina?fq=C%3a%2f805%2f&fq=specificationFilter_99%3aLight%20Lager&PS=15&sl=396865e6-7e6b-4ae7-bcfc-5ccc8df30130&cc=5&sm=0&PageNumber=1')
		
		const $ = cheerio.load(res)
		let itens = $('body .list-prod.prateleira.n5colunas > ul .product-info .product-name')

        let links = []

		itens.each((i,item)=>{
			links.push($(item).find('a').attr('href'))
		})

        console.log(links)

})