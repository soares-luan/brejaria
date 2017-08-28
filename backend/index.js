'use strict'

const express = require('express')
let app = express()
const cors = require('cors')
const Cerveja = require('./Cerveja')
const co = require('co')

app.use(cors())

app.get('/:nome/:offset/:limit',(req,res,next)=>{
    co(function* (){
        
        let nome = req.params.nome,offset = req.params.offset,limit=req.params.limit
        
        if(nome.length < 3){
            res.send('Por favor digite mais')
        }
        return yield Cerveja(nome,offset,limit)
    }).then(cervejas=>{
        res.send(cervejas)
    })
})

app.listen('80')