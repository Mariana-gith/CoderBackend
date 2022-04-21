const express = require('express')
const pug = require('pug');
const data = require('../data/dataProductos');

const {Router}= express

const routePug = new Router()

routePug.use(express.json());
routePug.use(express.urlencoded({extended:false}));


routePug.get("/",(req,res)=>{
    res.render("home")
})

routePug.get("/form",(req,res)=>{
    res.render("form")
})

routePug.get("/productos",(req,res)=>{
    res.render("productos", {data:data})
})

routePug.post("/form",(req,res)=>{
    let nuevoProd ={
        id: data.length +1,
        nombre: req.body.nombre,
        precio: req.body.precio
    }
    data.push(nuevoProd)
    res.redirect("/pug/productos")
})



module.exports = routePug