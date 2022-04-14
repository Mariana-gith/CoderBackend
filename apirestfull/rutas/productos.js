const { Router } = require("express");

const rutaProductos = new Router()

let productos = []


rutaProductos.get('/', (req,res)=>{
    res.json(productos)
})

rutaProductos.get('/:id',(req,res)=>{
    const {id}= req.params
    const producto = productos.find((p)=>{
        return p.id === parseInt( id)
    })
    if(!producto){
        res.json({mensaje:"El producto no existe"})
    }else{
        res.json({productoElegido:producto})
    }
})

rutaProductos.post('/', (req,res)=>{
    if(productos.length > 0){
        req.body.id = productos.length +1
        console.log(productos)
        productos.push(req.body)
        res.json(req.body)
    }else{
        req.body.id = 1
        productos.push(req.body)
        console.log(productos)
        res.json(req.body)
    }
})

rutaProductos.put('/:id',(req,res)=>{
    let {id}= req.params
    id = req.body.id
    let nuevoProd = req.body 
    req.body.id = req.params
    let producto= productos.find(p=>{
        return p.id == id
    })

    producto= nuevoProd
    console.log(nuevoProd)
    res.json(nuevoProd)
})

rutaProductos.delete('/:id',(req,res)=>{
    const {id}= req.params
    if(productos.length > 0){
        let nuevoArray = productos.filter((p)=>{
            return p.id != parseInt( id)
        })
        productos = nuevoArray
        console.log("productoss", productos)
        res.json(nuevoArray)
    }else{
        res.json({mensaje:"no se encontraron productos disponibles"})
    }
})

module.exports =rutaProductos