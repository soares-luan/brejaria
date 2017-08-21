process.env.MONGODB = "mongodb://localhost:27017/estudBr"
const co = require('co')
const db = require('mongoco')
const fs = require('fs')

function insert(obj){
    co(function* (){
    
   /*  let doc = yield db.find('cervejaria').catch(e=>{
        console.log(e)
    })
    console.log(doc) */

    let doc = yield db.insert('cervejaria',obj)

    console.log(doc)
})
}


let inicia = function(site){

	arquivo = `./backend/site_${site}.json`
	const obj_original = JSON.parse(fs.readFileSync(arquivo))
	let objCopia = JSON.parse(JSON.stringify(obj_original));

    insert(objCopia)


}
inicia('cervejastore')