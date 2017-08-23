'use strict'

const express = require('express')
let app = express()
const cors = require('cors')
const Cerveja = require('./Cerveja')
const co = require('co')

app.use(cors())

app.get('/:nome',(req,res,next)=>{
    co(function* (){
        if(req.params.nome.length < 3){
            res.send('Por favor digite mais')
        }
        return yield Cerveja(req.params.nome)
    }).then(cervejas=>{
        res.send(cervejas)
    })
})

app.listen('80')