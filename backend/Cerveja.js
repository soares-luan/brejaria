'use strict'
process.env.MONGODB = "mongodb://localhost:27017/estudBr"
const co = require('co')
const db = require('mongoco')

function get(nome){
    return co(function* (){
        //ObjectId("599c38895c7f243bdd133739")
        let cervejas = yield db.find('cervejas',{nome:new RegExp(nome,'i')})
        return cervejas
    })
}
module.exports = get