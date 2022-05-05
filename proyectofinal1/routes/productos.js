const express = require('express')
const {Router}= express

const productosRoute= new Router()

const contenedorProductos = require('../containers/productos')

const productos = new contenedorProductos.Productos('memoria/productos.json')



productosRoute.get("/",async (req,res)=>{
   let todos= await  productos.getAll()
   res.send(todos)
})

productosRoute.get("/:id",async (req,res)=>{
    let {id} = req.params
      req.body.id =parseInt(id) 
    let porId = await productos.getById(id)
    res.send(porId)
})

productosRoute.post("/", async (req,res)=>{
    let nuevoProd = req.body
    let agregado = await productos.save(nuevoProd)
    res.json(agregado)
})

productosRoute.put("/:id", async (req,res)=>{
    let {id} = req.params
    let producto = req.body
    producto.id = parseInt(id)

    console.log(producto)
    await productos.upDateById(producto)
    res.send('Producto actulizado correctamente!')
})

productosRoute.delete("/:id",async (req,res)=>{
    let{id}= req.params
    console.log("desde ruta",id)
    let eliminado = await productos.deleteById(id)
    res.send(eliminado)
})


module.exports = productosRoute
