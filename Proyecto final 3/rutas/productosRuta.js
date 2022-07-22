import { Router } from 'express'
import {guardar,obtenerTodos} from '../data/dataBaseProducto.js'
// import {} from '../data/dataBaseUsuario'



const productosRuta = new Router()

const usuario = "Mariana"


productosRuta.get("/", (req,res)=>{
    
    res.render("cargarProds", {data:productos,usuario:usuario})
})

const productos = await obtenerTodos()


productosRuta.post("/",async (req,res)=>{
    console.log("req.body",req.body)
    const nuevoProd ={
        name:req.body.name,
        price:req.body.price
    }
    const data= await guardar(nuevoProd)
    console.log("data",data)
})


export default productosRuta