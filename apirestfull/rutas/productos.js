const { Router } = require("express");

const rutaProductos = new Router()

let productos = require('../productosMemoria/productos.js')
// let productos = [
    
//   ]


rutaProductos.get('/', (req,res)=>{
    res.json({Productos:productos})
})

rutaProductos.get('/:id',(req,res)=>{
    const {id}= req.params
    const producto = productos.find((p)=>{
        return p.id === parseInt( id)
    })
    if(!producto){
        res.json({mensaje:"El producto no existe"})
    }else{
        res.json({"Producto Elegido":producto})
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
        let nuevoProd = req.body 
        req.body.id =parseInt(id) 

        let producto= productos.splice(id= id-1 ,1,nuevoProd)
        if(producto.length == 0){
          return  res.json({mensaje:"El producto no existe"})
        }
        else{
            
            res.json({Modificado : producto})  
        } 
    })

rutaProductos.delete('/:id',(req,res)=>{
    let {id}= req.params
    let producto = productos.find((p)=>{
        return p.id === parseInt( id)
    })
    // if(!producto){
    //     res.json({mensaje:"el producto no existe"})
    // }
    if(!producto){
        res.json({mensaje:"no se encontraron productos disponibles"})
    }else{
        let nuevoArray = productos.filter((p)=>{
            return p.id != parseInt( id)
        })
        productos = nuevoArray
        console.log("productoss", productos)
        res.json({"Producto Eliminado" : producto})
    }
   

    
})

module.exports =rutaProductos