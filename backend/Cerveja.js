'use strict'
process.env.MONGODB = "mongodb://localhost:27017/estudBr"
const co = require('co')
const db = require('mongoco')

function get(nome,offset,limit){
    return co(function* (){
        //ObjectId("599c38895c7f243bdd133739")
        //let cervejas = yield db.find('cervejas',{nome:new RegExp(nome,'i')}).skip(offset).limit(limit)
        let cervejas = yield db.aggregate('cervejas',[
            {$match:{nome:RegExp(nome,'i')}},
            {$skip:parseInt(offset)},
            {$limit:parseInt(limit)}
        ]).catch(e=>{
            console.log('erro na query',e)
        })
        return cervejas
    })
}
module.exports = get