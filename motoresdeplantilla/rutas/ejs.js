const express = require('express')
const {Router} = express

const routerEjs = new Router()

const data = require('../data/dataProductos')

routerEjs.use(express.json());
routerEjs.use(express.urlencoded({extended:false}));

routerEjs.get("/",(req,res)=>{
    res.render('index')
})

routerEjs.get("/form",(req,res)=>{
    res.render('form')
})

routerEjs.get("/productos",(req,res)=>{
    res.render('productos',{data:data})
})

routerEjs.post("/form",(req,res)=>{
    console.log(req.body)
    console.log(data)
    const nuevoProd ={
        id: data.length +1 ,
        name:req.body.name,
        price:req.body.price
    }
    console.log(data)

    data.push(nuevoProd)
    res.redirect("/ejs/productos")
})


module.exports = routerEjs