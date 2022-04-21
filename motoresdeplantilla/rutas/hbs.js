const express = require('express')
const {Router} = express

// const data = []

const data = require('../data/dataProductos');
const reuterHbs = new Router()


reuterHbs.get("/",(req,res)=>{
    res.render("home")
})

reuterHbs.get("/form",(req,res)=>{
    res.render("form")
})

reuterHbs.get("/productos", (req,res)=>{
    res.render("Productos",{data:data})
})

reuterHbs.post("/form", (req,res)=>{
    console.log(req.body)
    let newProd={
        id: data.length +1 ,
        nombre : req.body.nombre,
        precio: req.body.precio
    }
    data.push(newProd)
    res.redirect("productos")
})

module.exports= reuterHbs