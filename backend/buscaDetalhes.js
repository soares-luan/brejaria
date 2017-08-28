process.env.MONGODB = "mongodb://localhost:27017/estudBr"
let req = require('request-promise')
let cheerio = require('cheerio')
const co = require('co')
const db = require('mongoco')

module.exports = rodaScript

function rodaScript(){
    co(function* (){
        let data = new Date()
        let passouDuas = new Date(data.getTime() - 1000*3600*3);
        let cervejarias = yield db.find('cervejarias',{$or:[ {updated_at:{$lt:passouDuas}},{novos:{$gt:0}}]})
        
        while(cervejarias.length > 0){
            
            let cervejaria = cervejarias.shift()
            let cervejas = yield buscaDetalhes(cervejaria)

            yield db.findOneAndUpdate('cervejarias',cervejaria._id,{$set:{updated_at:data,novos:0}})
        }
        console.log('Ok')
    })
}

let buscaDetalhes = function(cervejaria){
	return co(function* (){
        let i = 1
        while(cervejaria.links.length > 0 && cervejaria.detalhes){
            let link = cervejaria.links.shift()
            link = cervejaria.site+link.replace(cervejaria.site,'')
            let existe = yield db.findOne('cervejas',{link:link})
            let data = new Date()
            let passouDuas = new Date(data.getTime() - 1000*3600*3);
            if(existe && existe.updated_at > passouDuas){
                continue
            }
            
            let res = yield req.get(link).catch(e=>{
                return 'Error'
            })
            if(res == 'Error'){
                continue
            }
            const $ = cheerio.load(res)
            let preco,nome,img
            //busco os dados no html
            switch(cervejaria.detalhes.tipo){
                case 'meta':
                    if($(`meta[${cervejaria.detalhes.metatype}='${cervejaria.detalhes.preco}']`).length == 0){
                        continue
                    }
                    preco = $(`meta[${cervejaria.detalhes.metatype}='${cervejaria.detalhes.preco}']`).attr('content')
                    nome = $(`meta[${cervejaria.detalhes.metatype}='${cervejaria.detalhes.nome}']`).attr('content').split('-')[0].replace('Cerveja','')
                    img = $(`meta[${cervejaria.detalhes.metatype}='${cervejaria.detalhes.img}']`).attr('content')
                    break
                default:
                    if($(cervejaria.detalhes.preco).length == 0){
                        continue
                    }
                    preco = $(cervejaria.detalhes.preco).text()
                    nome = $(cervejaria.detalhes.nome).text().split('-')[0].replace('Cerveja','')
                    img = $(cervejaria.detalhes.img).attr('src')
                    console.log('default')
                    break
            }
            
            let indisponivel = $(cervejaria.indisponivel).attr('style') && $(cervejaria.indisponivel).attr('style') != '' && $(cervejaria.indisponivel).attr('style').indexOf('display:none') == 0 ? true : false
            
            
            updated_at = new Date()
            let payload = {preco,nome,img,updated_at,indisponivel,link}
            console.log(payload)
            yield db.findOneAndUpdate('cervejas',{"link":link},payload,{upsert:true})

            i++
        }
        
	})
}