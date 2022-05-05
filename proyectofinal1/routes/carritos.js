const express = require('express')
const{Router}= express

const routeCarritos = new Router()

const contenedorCarritos = require('../containers/carritos')

const carrito = new contenedorCarritos.Carritos("memoria/carritos.json")

routeCarritos.post("/", async (req,res)=>{
    let carros = await carrito.agregarCarrito()
    res.json(carros)
})

routeCarritos.get("/", async(req,res)=>{
    let todos = await carrito.obtenerTodos()
    res.send(todos)
})

routeCarritos.get("/:id", async(req,res)=>{
    let elegido = await carrito.obtenerporId(req.params.id)
    res.send(elegido)
})

routeCarritos.post("/:id/productos",async (req,res)=>{
    let{id}=req.params
    let producto = req.body
    await carrito.agregarProductos(producto,id)
    res.send({mensaje:"se agregaron  productos"})
})

routeCarritos.delete("/:id/productos/:id_prod",async (req,res)=>{
    let carritoId = req.params.id
    let prodId = req.params.id_prod
    console.log(carritoId,prodId)
    await carrito.eliminarProducto(carritoId,prodId)
    res.send({mensaje:"se borro el producto del carrito"})        
})

routeCarritos.delete("/:id",async(req,res)=>{
    let{id}=req.params
    await carrito.eliminarCarrito(id)
    res.send({mensaje: "Se borro el carrito"})

})



module.exports = routeCarritos
